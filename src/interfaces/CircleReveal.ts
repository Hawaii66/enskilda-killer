export type RevealInfo = {
  circles: { id: number; name: string; color: string }[];
  kills: {
    murderer: number;
    target: number;
    created_at: number;
    circle: number;
  }[];
  users: {
    id: number;
    firstname: string;
    lastname: string;
    group: string;
    circle: number;
  }[];
  targets: { murderer: number; target: number }[];
};
