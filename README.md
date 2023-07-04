# zod-rhf-validation
zod , react-hook-form 연동하여 이름, 이메일, 패스워드 등 form validation 합니다. 참고자료: (https://www.youtube.com/watch?v=dldjCPa9ZW4)

## 프로세스
1. `yarn add zod react-hook-form @hookform/resolvers`
2. ```
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
3. ```
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
  
  ```
4.   ```
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
   ```