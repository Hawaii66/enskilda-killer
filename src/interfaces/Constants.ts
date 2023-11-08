export type GameState = {
  startdate: number;
  isPaused: boolean;
  allowSignUp: boolean;
  info: {
    header: string;
    text: string;
    type: "info" | "warning";
  };
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
