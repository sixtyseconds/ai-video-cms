import { supabase } from '../supabase';
import { useAuth } from '@/contexts/AuthContext';

export async function deleteAllUserVideos() {
  const { user } = useAuth();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('user_id', user.id);

  if (error) {
    throw new Error(`Failed to delete videos: ${error.message}`);
  }
}