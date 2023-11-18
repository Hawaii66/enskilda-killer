export type Track = {
  name: string;
  user?: {
    firstname: string;
    lastname: string;
    email: string;
    id: number;
  };
  data?: string;
  createdAt: number;
  id: number;
};
