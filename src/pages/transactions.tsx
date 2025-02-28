import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import Header from "../components/header";
import Table from "../components/table";
import Footer from "../components/footer";
import styles from "../styles/transactions.module.css";


export default function Transactions() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h2 className={styles.title}>Transações</h2>
        <Table />
      </main>
      <Footer />
    </div>
  );
}
