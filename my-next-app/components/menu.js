import styles from '../styles/chat.module.css';
import { useSession, signOut } from "next-auth/react";
import LoginPage from '../pages/user/login'; 

const Menu = () => {
    const { data: session, status } = useSession();

    const handleSignOut = async () => {
        const result = await signOut({ callbackUrl: "/user/login", redirect: false });
        if(!result?.url) {
            console.error("Sign-out redirection failed");
        }
    };

    if(status === "loading") {
        return <p>Loading...</p>
    }

  return (
    <>
    {session ? (
    <nav className={styles.menu}>
      <ul className={styles.items}>
        <li className={`${styles.item}`}>
          <i className="fa fa-home" aria-hidden="true"></i>
        </li>
        <li className={`${styles.item}`}>
          <i className="fa fa-user" aria-hidden="true"></i>
        </li>
        <li className={`${styles.item}`}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </li>
        <li className={`${styles.item} ${styles.active}`}>
          <i className="fa fa-commenting" aria-hidden="true"></i>
        </li>
        <li className={`${styles.item}`}>
          <i className="fa fa-file" aria-hidden="true"></i>
        </li>
        <li className={`${styles.item}`}>
          <i className="fa fa-cog" aria-hidden="true"></i>
        </li>
        <button
            className={styles.signOutButton}
            onClick={() => handleSignOut()}
          >
            Sign Out
          </button>
      </ul>
    </nav>
    ) : (
        <LoginPage/>
    )}
    </>
  );
};

export default Menu;
