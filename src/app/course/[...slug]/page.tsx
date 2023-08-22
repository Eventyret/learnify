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
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });
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
    <div className="flex flex-col lg:flex-row mt-2">
      {/* CourseSideBar */}
      <div className="hidden lg:block lg:w-1/4">
        <CourseSideBar course={course} currentChapterId={chapter.id} />
      </div>

      {/* On small screens, CourseSideBar slide-in (assuming you'll use JavaScript to toggle this) */}
      <div className="block lg:hidden">
        <CourseSideBar course={course} currentChapterId={chapter.id} />
      </div>

      {/* MainContent */}
      <div className="lg:w-1/2 px-8">
        <MainVideoSummary
          chapter={chapter}
          unit={unit}
          chapterIndex={chapterIndex}
          unitIndex={unitIndex}
        />
      </div>

      {/* QuizCards */}
      <div className="lg:w-1/4 px-8">
        <QuizCards chapter={chapter} />
      </div>
    </div>
  );
}

export default CoursePage;