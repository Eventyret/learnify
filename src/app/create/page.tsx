import { getAuthSession } from '@/lib/auth';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

interface CreatePageProps { }

const CreatePage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/gallery')
  }

  return (

    <div className='flex flex-col items-center max-w-xl px-8 mx-auto my-16 sm:px-0'>
      <h1 className='self-center text-3xl font-bold text-center sm:text-6xl'>Learning Jurney</h1>
      <div className='flex p-4 mt-5 border-none bg-secondary'>
        <InfoIcon className='w-12 h-12 mr-3 text-blue-400' />
        <p>Enter in a course title, or what you want to learn about. Then enter a list of units which are the specifics you want to learn. And our AI will generate a course for your</p>
      </div>
      <CreateCourseForm />
    </div>
  );
}

export default CreatePage;