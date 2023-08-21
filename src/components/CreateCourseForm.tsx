"use client"

import { z } from 'zod';
import { createChaptersSchema } from '@/validators/course';
import { Form } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateCourseFormProps { }

type Input = z.infer<typeof createChaptersSchema>;

export const CreateCourseForm = () => {
  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: '',
      units: ["", "", ""]
    }
  })

  const onSubmit = (data: Input) => {
    console.log(data);
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

        </form>
      </Form>
    </div>
  );
}