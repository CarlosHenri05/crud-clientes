export interface Client {
  id: number;
  name: string;
  email: string;
  status: boolean;
  assets: Asset[];
}

export interface Asset {
  id: number;
  name: string;
  value: number;
  clientId: number;
  client?: Client;
}
