import { TransactionDto } from "./transaction";

export type StoreDto = {
    id: number;
    name: string;
    owner: string;
    document: string;
    balance: number;
    transactions: TransactionDto[];
  };