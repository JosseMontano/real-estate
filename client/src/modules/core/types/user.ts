
export type User = {
  id?: number;
  username?: string;
  cellphone?: number;
  email: string;
  qualification?: string;
  codeRecuperation?: string;
  role?: number; // 1: admin, 2: user
  available?: boolean;
  photo?: string;
};



