export type GameState = {
  startdate: number;
  isPaused: boolean;
  allowSignUp: boolean;
};

export type Admin = {
  email: string;
};

export type ConstantKey = "GameState" | "Enskildakaren" | "Groups";

export type Rule = {
  rule: string;
  header: string;
  index: number;
};

export type Concept = {
  concept: string;
  index: number;
};

export type Litigation = {
  userid: number;
  withid: number;
  text: string;
};
