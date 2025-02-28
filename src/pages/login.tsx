import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/login.module.css";

export default function Login() {
  const { loginWithEmail } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      
    } catch (err: any) {
      setError("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="E-mail"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}