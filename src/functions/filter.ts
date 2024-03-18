import { PlayerInfo } from "@/interfaces/Admin";
import { Circle } from "@/interfaces/Circle";
import { AllowedBackup } from "@/interfaces/Constants";
import { Filters } from "@/interfaces/Filters";

export const filterUsers = (
  users: PlayerInfo[],
  filters: Filters,
  targetFilters: Filters,
  backup: AllowedBackup
) => {
  const sorted = users
    .filter((u) => filterUser(u, filters, backup))
    .filter((u) => filterTargetUser(u, targetFilters))
    .sort((a, b) => sortUser(a, b, filters));

  if (filters.orderBy === "target") {
    const tempSorted = [...sorted];

    const sortedByTarget = [];
    while (tempSorted.length > 0) {
      var currentUser: PlayerInfo | undefined = tempSorted[0];
      while (currentUser) {
        sortedByTarget.push(currentUser);
        tempSorted.splice(tempSorted.indexOf(currentUser), 1);
        currentUser = tempSorted.find(
          (u) => u.user.id === currentUser!.user.target?.id
        );
      }
    }
    return sortedByTarget;
  }

  return sorted;
};

const filterTargetUser = (user: PlayerInfo, filters: Filters) => {
  switch (filters.onlyShow) {
    case "all":
      return true;
    case "alive":
      return true;
    case "dead":
      return true;
    case "notMember":
      return true;
    case "seeMurderer":
      return true;
    default:
      if ("circle" in filters.onlyShow) {
        return true;
      }
      return user.user.target?.group === filters.onlyShow.group;
  }
};

const filterUser = (
  user: PlayerInfo,
  filters: Filters,
  backup: AllowedBackup
) => {
  switch (filters.onlyShow) {
    case "all":
      return true;
    case "alive":
      return user.user.circle !== undefined;
    case "dead":
      return user.user.circle === undefined;
    case "notMember":
      return !user.user.isMember;
    case "seeMurderer":
      return user.user.showMurderer;
    default:
      if ("circle" in filters.onlyShow) {
        console.log(user.user.circle, filters.onlyShow.circle);
        return (
          user.user.circle &&
          user.user.circle.id.toString() === filters.onlyShow.circle
        );
      }

      return user.user.group === filters.onlyShow.group;
  }
};

const sortUser = (a: PlayerInfo, b: PlayerInfo, filters: Filters) => {
  switch (filters.orderBy) {
    case "id":
      return a.user.id - b.user.id;
    case "group":
      return a.user.group.localeCompare(b.user.group);
    case "kills":
      return b.kills.length - a.kills.length;
    case "forename":
      return `${a.user.firstname} ${a.user.lastname}`.localeCompare(
        `${b.user.firstname} ${b.user.lastname}`
      );
    case "lastname":
      return `${a.user.lastname} ${a.user.firstname}`.localeCompare(
        `${b.user.lastname} ${b.user.firstname}`
      );
    case "target":
      return 0;
    default:
      const _: never = filters.orderBy;
      return 0;
  }
};

export const orderByKeyToString = (key: Filters["orderBy"]) => {
  switch (key) {
    case "group":
      return "Klass";
    case "id":
      return "Id";
    case "kills":
      return "Mord";
    case "forename":
      return "Förnamn";
    case "lastname":
      return "Efternamn";
    case "target":
      return "Offer";
    default:
      const _: never = key;
      return "";
  }
};

export const showOnlyKeyToString = (
  key: Filters["onlyShow"],
  circles: Circle[]
) => {
  switch (key) {
    case "alive":
      return "Levande";
    case "dead":
      return "Döda";
    case "all":
      return "Alla";
    case "notMember":
      return "Inte medlem i kåren";
    case "seeMurderer":
      return "Kan se mördare";
    default:
      if ("circle" in key) {
        return circles.find((i) => i.id.toString() === key.circle)?.name || "";
      }
      return key.group;
  }
};

export const filterOnSearchQuery = (query: string, player: PlayerInfo) => {
  const {
    user: { email, firstname, group, id, lastname, phone, target },
  } = player;

  const lowercase = query.toLowerCase().replaceAll(" ", "");

  return (
    [
      email,
      group,
      id,
      `${firstname} ${lastname}`,
      phone,
      `${target?.firstname} ${target?.lastname}`,
    ].filter((i) => isMatch(query, i)).length > 0
  );
};

const isMatch = (query: string, toTest: string | number | undefined) => {
  if (toTest === undefined) return false;
  if (query === "") return true;

  return (
    query
      .toLowerCase()
      .split(" ")
      .filter((i) => {
        if (i === "") return false;
        return toTest.toString().toLowerCase().includes(i);
      }).length > 0
  );
};
