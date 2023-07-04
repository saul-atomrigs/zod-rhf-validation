'use client';

import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

export default function Home() {
  // ZOD SCHEMA:
  const schema: ZodType = z
    .object({
      firstName: z.string().min(2).max(10).optional(),
      lastName: z.string().min(2).max(10).optional(),
      email: z.string().email().optional(),
      age: z.number().int().positive().optional(),
      password: z.string().min(8).max(100).optional(),
      confirmPassword: z.string().min(8).max(100).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    });

  // REACT-HOOK-FORM:
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Form validation 성공 시 실행되는 함수:
  const submitData = (data: FormData) => {
    console.log('성공!', data);
  };

  // UI:
  return (
    <div className='App'>
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor=''>First name:</label>
        <input type='text' {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <label htmlFor=''>Last name:</label>
        <input type='text' {...register('lastName')} />

        <label htmlFor=''>Email:</label>
        <input type='email' {...register('email')} />

        <label htmlFor=''>Age:</label>
        <input type='number' {...(register('age'), { valueAsNumber: true })} />

        <label htmlFor=''>Password:</label>
        <input type='password' {...register('password')} />

        <label htmlFor=''>Confirm password:</label>
        <input type='password' />

        <input type='submit' />
      </form>
    </div>
  );
}
