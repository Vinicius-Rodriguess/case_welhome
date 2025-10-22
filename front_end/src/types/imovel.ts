export interface Imovel {
  id: number;
  title: string;
  address: string;
  status: "active" | "inactive" | string;
}