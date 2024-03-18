import { Database } from "./database";

export type GameState = {
  startdate: number;
  isPaused: boolean;
  allowSignUp: boolean;
  info: {
    header: string;
    text: string;
    type: "info" | "warning";
  };
  murderMove: number;
};

export type Admin = {
  email: string;
  name: string;
};

export type ConstantKey =
  | "GameState"
  | "Enskildakaren"
  | "Groups"
  | "LitigationReasons"
  | "JoinCircle";

export type Rule = {
  rule: string;
  header: string;
  index: number;
};

export type Concept = {
  concept: string;
  index: number;
};

type Rows<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"][];
export type Backup = {
  admins: Rows<"admins">;
  circles: Rows<"circles">;
  concepts: Rows<"concepts">;
  constants: Rows<"constants">;
  kills: Rows<"kills">;
  litigations: Rows<"litigations">;
  pendingkills: Rows<"pendingkills">;
  posts: Rows<"posts">;
  rules: Rows<"rules">;
  targets: Rows<"targets">;
  users: Rows<"users">;
  usersincircle: Rows<"usersincircle">;
};

export type AllowedBackup = {
  circles: {
    id: number;
    name: string;
    color: string;
    multipleTargets: boolean;
    hidden: boolean;
  }[];
  constants: {
    data: string;
    query: string;
  }[];
  kills: {
    murderer: number;
    circle: number;
    target: number;
    id: number;
    created_at: number;
  }[];
  targets: {
    murderer: number;
    target: number;
  }[];
  users: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    group: string;
    showMurderer: boolean;
  }[];
  usersincircle: {
    user: number;
    circle: number;
  }[];
  time: number;
};
