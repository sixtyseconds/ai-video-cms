import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { deleteVideoFiles } from '@/lib/storage/video-storage';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { StorageError, DatabaseError } from '@/lib/types/errors';

interface VideoFiles {
  videoPath?: string;
  audioPath?: string;
  thumbnailPath?: string;
}

export function useVideoDelete() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, files }: { id: string; files: VideoFiles }) => {
      if (!user) {
        throw new Error('User must be authenticated');
      }

      try {
        // First delete the database record to stop processing
        const { error: deleteError } = await supabase
          .from('videos')
          .delete()
          .match({ id, user_id: user.id });

        if (deleteError) {
          throw new DatabaseError(`Failed to delete database record: ${deleteError.message}`);
        }

        // Delete all associated files from storage
        try {
          if (Object.values(files).some(Boolean)) {
            await deleteVideoFiles(files);
          }
        } catch (error) {
          // Log but don't throw - files may not exist yet if processing hadn't completed
          console.warn('Storage cleanup failed:', error);
        }

        return id; // Return the deleted video id
      } catch (error) {
        console.error('Delete operation failed:', error);
        
        if (error instanceof StorageError) {
          throw new Error(`Storage error: ${error.message}`);
        }
        if (error instanceof DatabaseError) {
          throw new Error(`Database error: ${error.message}`);
        }
        
        throw new Error('An unexpected error occurred while deleting the video');
      }
    },
    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['videos', user?.id] });

      // Snapshot the previous value
      const previousVideos = queryClient.getQueryData(['videos', user?.id]);

      // Optimistically update to the new value
      queryClient.setQueryData(['videos', user?.id], (old: any[] | undefined) => {
        if (!old) return [];
        return old.filter(video => video.id !== id);
      });

      // Return a context object with the snapshotted value
      return { previousVideos };
    },
    onError: (error: Error, _, context) => {
      // Rollback to the previous value on error
      if (context?.previousVideos) {
        queryClient.setQueryData(['videos', user?.id], context.previousVideos);
      }

      console.error('Delete failed:', error);
      toast({
        title: "Delete failed",
        description: error.message || "Could not delete the video. Please try again.",
        variant: "destructive"
      });
    },
    onSuccess: (deletedId) => {
      toast({
        title: "Video deleted",
        description: "The video has been successfully removed"
      });

      // Invalidate and refetch after a short delay to ensure storage consistency
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['videos', user?.id] });
      }, 1000);
    }
  });
}