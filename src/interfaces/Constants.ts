export type GameState = {
  startdate: number;
  name: string;
  isPaused: boolean;
};

export type Admin = {
  email: string;
};

export type ConstantKey = "GameState" | "Enskildakaren";

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
