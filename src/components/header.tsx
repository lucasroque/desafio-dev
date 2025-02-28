import { useAuth } from "@/contexts/authContext";
import styles from "../styles/header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className={styles.header}>
      <h1>Transações</h1>
      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
