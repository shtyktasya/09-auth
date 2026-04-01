import css from "./Profile.module.css"
import type { Metadata } from "next"
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'User profile page in NoteHub application',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'User profile page in NoteHub application',
    url: 'https://notehub.com/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile preview',
      },
    ],
    type: 'website',
  },
};
const Profile = () => {
    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src=""
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: your_username
      </p>
      <p>
        Email: your_email@example.com
      </p>
    </div>
  </div>
</main>

    )
}
export default Profile;