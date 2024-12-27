import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { startVideoProcessing } from '@/lib/ffmpeg/background-processor';

export function useVideoRestart() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, videoUrl }: { id: string; videoUrl?: string }) => {
      if (!user) {
        throw new Error('User must be authenticated');
      }

      let file: File | undefined;
      if (videoUrl) {
        try {
          const response = await fetch(videoUrl);
          const blob = await response.blob();
          file = new File([blob], 'video.mp4', { type: 'video/mp4' });
        } catch (error) {
          console.warn('Failed to fetch original video:', error);
        }
      }

      // Reset processing status
      const { error } = await supabase
        .from('videos')
        .update({
          processing_status: 'pending',
          processing_step: null,
          processing_error: null,
          processing_started_at: null,
          processing_completed_at: null
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        throw new Error('Failed to reset video status');
      }
      
      // If we have the original file, restart processing
      if (file) {
        startVideoProcessing(file, id);
      }

      return id;
    },
    onSuccess: (videoId) => {
      toast({
        title: "Processing restarted",
        description: "Video processing has been restarted"
      });
      queryClient.invalidateQueries({ queryKey: ['videos', user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to restart processing",
        variant: "destructive"
      });
    }
  });
}