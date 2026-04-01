'use client';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, FormEvent } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, updateMe } from '@/lib/api/clientApi';

const EditProfile = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      getMe()
        .then(data => {
          if (data) {
            setUserName(data.username);
            setAvatar(data.avatar);
            setEmail(data.email);
            setUser(data);
          }
        })
        .catch(err => console.error(err));
    }
  }, [user, setUser]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleSaveUser = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updatedUser = await updateMe({ username: userName });
      setUser(updatedUser);
      router.push('/profile');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image src={avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleChange}
              required
            />
          </div>

          <p>Email: {email}</p>
          {error && <p className={css.error}>{error}</p>}
          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={loading}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default EditProfile;
