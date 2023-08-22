import { Chapter, Unit } from '@prisma/client';

interface MainVideoSummaryProps {
  chapter: Chapter
  unit: Unit
  chapterIndex: number
  unitIndex: number
}

export const MainVideoSummary: React.FC<MainVideoSummaryProps> = async ({ chapter, unit, unitIndex, chapterIndex }) => {
  return (
    <div className='flex-[2] mt-16'>
      <h4 className='text-sm uppercase text-secondary-foreground/60'>
        Unit {unitIndex + 1} &bull;  Chapter{chapterIndex + 1}</h4>
      <h1 className='text-4xl font-bold'>{chapter.name}</h1>
      <iframe
        title={chapter.name}
        allowFullScreen
        className='w-full mt-4 aspect-video max-h-[24rem]'
        src={`https://www.youtube.com/embed/${chapter.videoId}`} />
      <div className='mt-4'>
        <h3 className='text-3xl font-serif'>Summary</h3>
        <p className='mt-2 text-secondary-foreground/80'>
          {chapter.summary}
        </p>
      </div>
    </div>
  );
}