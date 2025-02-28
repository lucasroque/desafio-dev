import { useState, useEffect } from "react";
import styles from "../styles/table.module.css";
import { processTransactions } from "@/services/transactions";
import api from "@/config/axios";
import { useAuth } from "@/contexts/authContext";
import { formatCurrency, formatDate, formatTime, formatTransacrionType } from "@/utils/formatters";
import { listStores, cleanStores, listStoresByDocument } from "@/services/stores";
import { StoreDto } from "@/dtos/store";
import { TransactionDto } from "@/dtos/transaction";

export default function Table() {

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StoreDto[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {

    if (user?.role === "ADMIN") {
      const response = await listStores()
      setData(response)
    } else {
      const response = await listStoresByDocument(user?.document as string)
      setData(response)
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecione um arquivo!");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {

      const data = await processTransactions(formData)
      alert(`Arquivo processado com sucesso`);
      setData(data)
      resetFile()
      setLoading(false);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar arquivo!");
    }
  };

  const handleClear = async () => {
    try {
      setLoading(true);
      await cleanStores()

      alert("Lojas limpas com sucesso!");
      loadStores();
      setLoading(false);
    } catch (error: any) {
      alert("Erro ao limpar lojas!");
    }
  };

  function resetFile() {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.value = "";
  }

  return (
    <div className={styles["table-container"]}>
      {data.length > 0 ? (
        <div className={styles.container}>
          {data.map((store: StoreDto) => (
            <div key={store.document} className={styles.storeCard}>
              <h2 className={styles.storeHeader}>{store.name} - {store.owner}</h2>
              <p className={styles.storeInfo}><strong>Documento:</strong> {store.document}</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Cartão</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {store.transactions.map((transaction: TransactionDto) => (
                    <tr key={transaction.id}>
                      <td>{formatTransacrionType(transaction.type).description}</td>
                      <td>{formatDate(transaction.date)}</td>
                      <td>{formatTime(transaction.time)}</td>
                      <td>{transaction.card}</td>
                      <td>{formatCurrency((transaction.value + "").replace(".", ","))}</td>
                    </tr>
                  ))}
                  <tr className={styles.totalRow}>
                    <td colSpan={4}><strong>Saldo</strong></td>
                    <td><strong>{formatCurrency((store.balance + "").replace(".", ","))}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ marginBottom: "2rem", padding: "10px" }}>
          <h2>Nenhum dado disponível</h2>
        </div>
      )}
      <div className={styles.buttons}>
        <input type="file" id="fileInput" accept=".txt" onChange={handleFileChange} />
      </div>
      <div className={styles.loading}>
        {loading && <div className={styles.loader}></div>}
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleUpload} disabled={!file}>
          Importar
        </button>
        <button className={styles.button} onClick={handleClear}>
          Limpar
        </button>
      </div>
    </div>
  );
}
