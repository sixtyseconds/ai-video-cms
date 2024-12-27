import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAllUserVideos } from '@/lib/database/video-operations';
import { useToast } from './use-toast';

export function useVideoClear() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteAllUserVideos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({
        title: "Videos cleared",
        description: "All videos have been removed"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
}