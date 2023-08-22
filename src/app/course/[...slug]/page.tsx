import CourseSideBar from '@/components/CourseSideBar'
import { MainVideoSummary } from '@/components/MainVideoSummary'
import { QuizCards } from '@/components/QuizCards'
import { prisma } from '@/lib/db'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
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
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];
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
        <div className="flex pb-8">
          {prevChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
              className="flex mt-4 mr-auto w-fit"
            >
              <div className="flex items-center">
                <ChevronLeft className="w-6 h-6 mr-1" />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-secondary-foreground/60">
                    Previous
                  </span>
                  <span className="text-xl font-bold">
                    {prevChapter.name}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {nextChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
              className="flex mt-4 ml-auto w-fit"
            >
              <div className="flex items-center">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-secondary-foreground/60">
                    Next
                  </span>
                  <span className="text-xl font-bold">
                    {nextChapter.name}
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 ml-1" />
              </div>
            </Link>
          )}
        </div >
      </div>

      {/* QuizCards */}
      <div className="lg:w-1/4 px-8">
        <QuizCards chapter={chapter} />
      </div>
      <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />

    </div >
  );
}

export default CoursePage;