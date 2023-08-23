import { Chapter, Course, Unit } from '@prisma/client';
import { ExternalLink, LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryCourseCardProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

export const GalleryCourseCard: React.FC<GalleryCourseCardProps> = async ({ course }) => {
  return (

    <>
      <div className="p-5 border rounded bg-white flex flex-col">
        <div className="relative flex-shrink-0">
          <Image
            src={course.image || ""}
            className="card-image"
            width={300}
            height={300}
            alt="picture of the course"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
            <Link href={`/course/${course.id}/0/0`} className="text-white ">
              <ExternalLink className='w-12 h-12' />
            </Link>
          </div>
          <h2 className="absolute bottom-0 left-0 p-2 bg-opacity-50 bg-gray-900 text-white card-title"> {course.name}</h2>
        </div>
        <div className="card-content space-y-2 flex-grow">
          <h4 className="text-sm text-black">Units</h4>
          {course.units.map((unit, unitIndex) => {
            return (
              <Link
                href={`/course/${course.id}/${unitIndex}/0`}
                key={unit.id}
                className="block underline w-fit text-black "
              >
                {unit.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>

  );
}