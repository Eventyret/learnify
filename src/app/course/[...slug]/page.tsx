import CourseSideBar from '@/components/CourseSideBar'
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
    <CourseSideBar
      course={course}
      currentChapterId={chapter.id}
    />
  );
}

export default CoursePage;