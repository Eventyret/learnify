import { cn } from '@/lib/utils';
import { Course, Unit, Chapter } from '@prisma/client';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Menu } from 'lucide-react';

type CourseSideBarProps = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
}

const CourseSidebar: React.FC<CourseSideBarProps> = ({ course, currentChapterId }) => {
  return (
    <div
      className="group flex w-[150px] hover:w-[400px] md:w-[150px] md:hover:w-[400px] xl:w-[400px] h-[60px] md:h-min-screen xl:h-auto fixed md:fixed xl:static z-10 top-0 p-6 rounded-r-3xl bg-white dark:bg-gray-950 xl:translate-x-0 hover:h-screen transition-all duration-300 ease-in-out sm:mt-16 md:mt-16 xl:mt-0 xl:dark:bg-secondary xl:bg-secondary">
      <Menu name="menu" className="self-center xl:hidden group-hover:hidden w-6 h-6 mr-2" />
      <span className="self-center xl:hidden group-hover:hidden">Chapters</span>
      <div className="w-full hidden md:hidden xl:block group-hover:block sm:overflow-y-auto md:overflow-y-auto lg:overflow-y-auto xl:overflow-y-visible">
        <h1 className='text-4xl font-bold'>
          {course.name}
        </h1>
        {course.units.map((unit, unitIndex) => {
          return (
            <div key={unit.id} className='mt-4'>
              <h2 className='text-sm uppercase text-secondary-foreground/60'>Unit {unitIndex + 1}</h2>
              <h3 className='text-2xl font-bold'> {unit.name}</h3>
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <div key={chapter.id}>
                    <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                      className={cn({
                        "text-secondary-foreground/60": chapter.id !== currentChapterId,
                        "hover:text-primary": chapter.id !== currentChapterId,
                        "text-green-500 font-bold": chapter.id === currentChapterId
                      })}>

                      {chapter.name}
                    </Link>
                  </div>
                )
              })}
              <Separator className='mt-2 text-gray-500 bg-gray-500' />
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default CourseSidebar;
