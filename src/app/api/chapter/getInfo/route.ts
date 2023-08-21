import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodyParser = z.object({
  chapterId: z.string(),
})

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    const { chapterId } = bodyParser.parse(body)
    return NextResponse.json({ hello: "world" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        sucess: false,
        error: "Invalid body"
      }, { status: 400 })
    } else {
      return NextResponse.json({
        sucess: false,
        error: "unknown"
      }, { status: 500 })
    }
  }
}
