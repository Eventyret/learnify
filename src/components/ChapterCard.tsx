"use client"
import { cn } from '@/lib/utils';
import { Chapter } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';

interface ChapterCardProps {
  chapter: Chapter
  chapterIndex: number
  completedChapters: Set<String>
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>
}
export type ChapterCardHandler = {
  triggerLoad: () => void
}

const ChapterCard = forwardRef<ChapterCardHandler, ChapterCardProps>(({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {

  const { toast } = useToast()
  const [success, setSuccess] = useState<boolean | null>(null)

  const addChapterIdToSet = useCallback(() => {
    setCompletedChapters((prev) => {
      const newSet = new Set(prev);
      newSet.add(chapter.id);
      return newSet;
    });
  }, [chapter.id, setCompletedChapters]);

  useEffect(() => {
    if (chapter.videoId) {
      setSuccess(true);
      addChapterIdToSet
    }
  }, [chapter, addChapterIdToSet]);

  useImperativeHandle(ref, () => ({
    async triggerLoad() {
      if (chapter.videoId) {
        addChapterIdToSet();
        return;
      }
      getChapterInfo(undefined, {
        onSuccess: () => {
          setSuccess(true)
          addChapterIdToSet()
        },
        onError: (error) => {
          console.log(error)
          setSuccess(false)
          toast({
            title: "Chapter Choke!",
            description: `Oops, we hit a snag while turning ${chapter.name}  into a chapter.`,
            variant: "destructive",
          });
          addChapterIdToSet()
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
      {isLoading && <Loader2 className="animate-spin" />}
    </div>
  );
})

ChapterCard.displayName = 'ChapterCard';

export default ChapterCard;