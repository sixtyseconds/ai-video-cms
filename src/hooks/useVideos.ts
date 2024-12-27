import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Video } from '@/types/video';
import { useAuth } from '@/contexts/AuthContext';

export function useVideos() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Fetch videos error:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
    // Refresh every 5 seconds while processing
    refetchInterval: (data) => {
      const hasProcessingVideo = Array.isArray(data) && data.some(video => 
        video.processing_status && video.processing_status !== 'completed'
      );
      return hasProcessingVideo ? 5000 : false;
    }
  });

  const createVideo = useMutation({
    mutationFn: async (newVideo: Partial<Video>) => {
      if (!user) throw new Error('User must be authenticated');

      const { data, error } = await supabase
        .from('videos')
        .insert([{ 
          ...newVideo,
          user_id: user.id,
          status: 'Draft',
          tags: Array.isArray(newVideo.tags) ? newVideo.tags : [],
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['videos', user?.id] });
    },
  });

  return {
    videos,
    isLoading,
    createVideo,
  };
}