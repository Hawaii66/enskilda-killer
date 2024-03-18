import { AllowedBackup } from "@/interfaces/Constants";

export const GetUser = (user: number, backup: AllowedBackup) => {
  const userBackup = backup.users.find((u) => u.id === user);
  if (!userBackup) return undefined;
  return userBackup;
};

export const GetOneTarget = (user: number, backup: AllowedBackup) => {
  const target = backup.targets.find((i) => i.murderer === user)?.target;
  if (!target) {
    return undefined;
  }

  return GetUser(target, backup);
};

export const GetCircleID = (user: number, backup: AllowedBackup) => {
  return backup.usersincircle.find((i) => i.user === user)?.circle;
};

export const IsAlive = (user: number, backup: AllowedBackup) => {
  return GetCircleID(user, backup) ? true : false;
};

export const GetCircle = (user: number, backup: AllowedBackup) => {
  return backup.circles.find((c) => c.id === GetCircleID(user, backup));
};
