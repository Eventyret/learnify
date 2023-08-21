import { NextResponse } from 'next/server';
import { createChaptersSchema } from '@/validators/course';
import { ZodError } from 'zod';

type outputUnits = {
  title: string;
  chapters: {
    youtubeSearchQuery: string
    chapterTitle: string
  }[]
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);


  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid Body", { status: 400 })
    }
  }

}