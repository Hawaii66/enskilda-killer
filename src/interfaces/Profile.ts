import { TargetUser } from "./User";
import { Circle as Circle2 } from "./Circle";

export type Me = {
  firstname: string;
  lastname: string;
  email: string;
  group: string;
  phone: string;
};

export type Circle =
  | { status: "dead" }
  | {
      status: "alive";
      circle?: string;
      target: TargetUser;
    };

export type Kills = {
  target: TargetUser;
  id: number;
  time: number;
  circle: Circle2;
}[];

export type Litigation = {
  with: TargetUser;
  witness?: TargetUser;
  text: string;
  id: number;
};
