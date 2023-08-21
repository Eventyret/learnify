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
  return (
    <div>
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  );
}

export default CoursePage;