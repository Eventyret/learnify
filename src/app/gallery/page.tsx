import { GalleryCourseCard } from '@/components/GalleryCourseCard';
import { prisma } from '@/lib/db';

interface GalleryPageProps { }

const GalleryPage: React.FC<GalleryPageProps> = async () => {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          }
        }
      }
    }
  })
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-stretch px-5">
        {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
}
export default GalleryPage;