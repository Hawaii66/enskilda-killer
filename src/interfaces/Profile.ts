import { TargetUser } from "./User";

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

export type Kills = { target: TargetUser; time: number; circle: string }[];

export type Litigation = {
  with: TargetUser;
  witness?: TargetUser;
  text: string;
};
