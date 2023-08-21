import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface CreatePageProps { }

const CreatePage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/gallery')
  }

  return (

    <div className='flex flex-col items-center max-w-xl px-8 mx-auto my-16 sm:px-0'>
      <h1 className='self-center text-3xl font-bold text-center sm:text-6xl'>Learnify</h1>
    </div>
  );
}

export default CreatePage;