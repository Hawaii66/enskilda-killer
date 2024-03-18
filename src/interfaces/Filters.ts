export type Filters = {
  orderBy: "id" | "forename" | "lastname" | "kills" | "group" | "target";
  onlyShow:
    | { circle: string }
    | "alive"
    | "dead"
    | "all"
    | "notMember"
    | "seeMurderer"
    | { group: string };
};
