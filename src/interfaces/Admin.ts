import { Kills } from "./Profile";
import { TargetUser, User } from "./User";

export type PlayerInfo = {
  user: User;
  kills: Kills;
};

export type PlayerContactInfo = {
  firstname: string;
  lastname: string;
  group: string;
  phone: string;
  email: string;
  id: number;
};

export type FullLitigation = {
  user: PlayerContactInfo;
  with: PlayerContactInfo;
  witness?: PlayerContactInfo;
  text: string;
  id: number;
};
