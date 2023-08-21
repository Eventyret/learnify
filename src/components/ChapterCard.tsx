"use client"

import axios from 'axios';
import { cn } from '@/lib/utils';
import { Chapter } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import React from 'react';
import { set } from 'zod';
import { useToast } from './ui/use-toast';

interface ChapterCardProps {
  chapter: Chapter
  chapterIndex: number
}
export type ChapterCardHandler = {
  triggerLoad: () => void
}

const ChapterCard = React.forwardRef<ChapterCardHandler, ChapterCardProps>(({ chapter, chapterIndex }, ref) => {
  const { toast } = useToast()
  React.useImperativeHandle(ref, () => ({
    async triggerLoad() {
      getChapterInfo(undefined, {
        onSuccess: () => {
          setSuccess(true)
        },
        onError: (error) => {
          console.log(error)
          setSuccess(false)
          toast({
            title: "Chapter Choke!",
            description: "Oops, we hit a snag while turning the page to your chapter.",
            variant: "destructive",
          });

        }
      })
    }
  }))
  const [success, setSuccess] = useState<boolean | null>(null)
  const { mutate: getChapterInfo, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/chapter/getInfo', {
        chapterId: chapter.id
      })
      return response.data
    }
  })
  return (
    <div key={chapter.id} className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
      "bg-secondary": success === null,
      "bg-red-500": success === false,
      "bg-green-500": success === true,
    })}>
      <h5>{chapter.name}</h5>
    </div>
  );
})

ChapterCard.displayName = 'ChapterCard';

export default ChapterCard;