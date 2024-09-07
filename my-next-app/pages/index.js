import { useSession, signOut } from "next-auth/react";
import LoginPage from '../pages/user/login';
import styles from "../styles/home.module.css";  // Assuming this stylesheet exists

export default function Home() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    const result = await signOut({ callbackUrl: "/user/login", redirect: false });
    if (!result?.url) {
      console.error("Sign-out redirection failed");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <>
      {session ? (
        <div className={styles.container}>
          <p>Welcome, {session.user.name}!</p>
          <button
            className={styles.signOutButton}
            onClick={() => handleSignOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <LoginPage/>
      )}
    </>
  );
}