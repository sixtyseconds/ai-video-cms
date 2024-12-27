import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useVideos } from '@/hooks/useVideos';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  tags: z.string().optional(),
});

interface VideoMetadataFormProps {
  videoUrl: string;
  onComplete: () => void;
}

export function VideoMetadataForm({ videoUrl, onComplete }: VideoMetadataFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createVideo } = useVideos();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await createVideo.mutateAsync({
        title: values.title,
        description: values.description || '',
        video_url: videoUrl,
        tags: values.tags ? values.tags.split(',').map(t => t.trim()) : [],
      });
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Title</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="h-10 bg-[#13151A] border-white/10 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:ring-blue-500/20" 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="min-h-[100px] bg-[#13151A] border-white/10 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:ring-blue-500/20" 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">
                Tags (comma separated)
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="h-10 bg-[#13151A] border-white/10 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:ring-blue-500/20" 
                  placeholder="tag1, tag2, tag3" 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onComplete}
            disabled={isSubmitting}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {isSubmitting && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}