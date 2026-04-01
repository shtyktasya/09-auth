'use client';
import css from './SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: LoginRequest = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      const user = await login(formValues);
      setUser(user);
      router.push('/profile');
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message || err.message || 'Oops... Some error');
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};
export default SignIn;
