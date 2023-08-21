import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

interface CreateChapterProps {
  params: {
    courseId: string
  }
}

const CreateChapter: React.FC<CreateChapterProps> = async ({ params: { courseId } }) => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/gallery")
  }

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
    return redirect("/create")
  }
  return (

  );
}

export default CreateChapter;