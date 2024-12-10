
type Follow= {
  user_id:number
  id:number
  user_followed_id:number
}

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
  following:Follow[]
};

