import { Circle } from "./Circle";

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  id: number;
  phone: string;
  group: string;
  target?: TargetUser;
  circle?: Circle;
  isMember: boolean;
  clerkId: string;
  kills: Record<
    Circle["id"],
    {
      circle: Circle;
      kills: number;
    }
  >;
  showMurderer: boolean;
};

export type TargetUser = {
  firstname: string;
  lastname: string;
  group: string;
  id: number;
};
