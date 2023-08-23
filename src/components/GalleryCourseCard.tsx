import { Chapter, Course, Unit } from '@prisma/client';
import { Book, ExternalLink, Star } from 'lucide-react';
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
      <div className="p-5 border rounded bg-white flex flex-col group">
        <div className="relative flex-shrink-0">
          <Image
            src={course.image || ""}
            className="card-image"
            width={300}
            height={300}
            alt="picture of the course"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50">
            <Link href={`/course/${course.id}/0/0`} className="text-white mb-2">
              <ExternalLink className='w-12 h-12' />
            </Link>
            <span className="text-white">Visit</span>
          </div>
          <h2 className="absolute bottom-0 left-0 p-2 bg-opacity-50 bg-gray-900 text-white card-title group-hover:opacity-0"> {course.name}</h2>
        </div>
        <div className="card-content space-y-2 flex-grow">
          <p className="text-gray-600"></p>
          <h4 className="text-sm text-black flex items-center">
            <Book className="mr-2 h-4 w-4" />
            Units
          </h4>
          {course.units.map((unit: Unit, unitIndex: number) => {
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
          {/* Add difficulty */}
          {/* <div className="flex items-center mt-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="ml-2 text-sm">4.8 (120 reviews)</span>
          </div> */}
        </div>
      </div>
    </>
  );
}