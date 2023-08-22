import CourseSideBar from '@/components/CourseSideBar'
import { MainVideoSummary } from '@/components/MainVideoSummary'
import { QuizCards } from '@/components/QuizCards'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

interface CoursePageProps {
  params: {
    slug: string[]
  }
}

const CoursePage: React.FC<CoursePageProps> = async ({ params: { slug } }) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug
  const course = await prisma.course.findUnique({
    where: {
      id: courseId
    },
    include: {
      units: {
        include: {
          chapters: true
        }
      }
    }
  })
  if (!course) {
    return redirect('/gallery')
  }
  const unitIndex = parseInt(unitIndexParam)
  const chapterIndex = parseInt(chapterIndexParam)

  const unit = course.units[unitIndex]
  if (!unit) {
    return redirect(`/gallery`)
  }
  const chapter = unit.chapters[chapterIndex]
  if (!chapter) {
    return redirect(`/gallery`)
  }
  return (
    <>
      <CourseSideBar
        course={course}
        currentChapterId={chapter.id}
      />
      <div className='ml-[400px] px-8'>
        <div className='flex'>
          <MainVideoSummary
            chapter={chapter}
            unit={unit}
            chapterIndex={chapterIndex}
            unitIndex={unitIndex}
          />
          <QuizCards />
        </div>
      </div>
    </>
  );
}

export default CoursePage;