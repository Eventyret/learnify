"use client"
import { cn } from '@/lib/utils';
import { Chapter } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';

interface ChapterCardProps {
  chapter: Chapter
  chapterIndex: number
  completedChapters: Set<String>
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>
}
export type ChapterCardHandler = {
  triggerLoad: () => void
}

const ChapterCard = React.forwardRef<ChapterCardHandler, ChapterCardProps>(({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {

  const { toast } = useToast()
  const [success, setSuccess] = useState<boolean | null>(null)

  const addChapterIdToSet = React.useCallback(() => {
    setCompletedChapters((prev) => {
      const newSet = new Set(prev);
      newSet.add(chapter.id);
      return newSet;
    });
  }, [chapter.id, setCompletedChapters]);

  useEffect(() => {
    if (chapter.videoId) {
      setSuccess(true);
      addChapterIdToSet;
    }
  }, [chapter, addChapterIdToSet]);

  React.useImperativeHandle(ref, () => ({
    async triggerLoad() {
      if (chapter.videoId) {

      }
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