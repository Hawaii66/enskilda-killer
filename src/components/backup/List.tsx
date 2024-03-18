import { AllowedBackup } from "@/interfaces/Constants";
import React, { useEffect, useState } from "react";
import UserPreview from "./UserPreview";
import { Filters } from "@/interfaces/Filters";
import FilterSelect from "../FilterSelect";
import { User } from "@/interfaces/User";
import { GetCircle, GetOneTarget } from "@/functions/allowedBackup";
import { filterOnSearchQuery, filterUsers } from "@/functions/filter";
import { PlayerInfo } from "@/interfaces/Admin";

type Props = {
  backup: AllowedBackup;
};

const ConstructUsers = (backup: AllowedBackup) => {
  const users: PlayerInfo[] = backup.users.map((u) => {
    const circle = backup.usersincircle.find((j) => j.user === u.id);

    const user = {
      user: {
        clerkId: "",
        email: u.email,
        firstname: u.firstname,
        group: u.group,
        id: u.id,
        lastname: u.lastname,
        phone: "",
        isMember: true,
        kills: {},
        showMurderer: u.showMurderer,
        circle:
          circle === undefined
            ? undefined
            : backup.circles.find((c) => c.id === circle.circle)!,
        target: GetOneTarget(u.id, backup),
      },
      kills: [],
    };

    return user;
  });

  return users;
};

function List({ backup }: Props) {
  const [filters, setFilters] = useState<Filters>({
    onlyShow: "all",
    orderBy: "target",
  });
  const [targetFilters, setTargetFilters] = useState<Filters>({
    onlyShow: "all",
    orderBy: "id",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [users, setUsers] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    setUsers(ConstructUsers(backup));
  }, [backup]);

  return (
    <div className="w-3/4">
      <FilterSelect
        filters={filters}
        searchQuery={searchQuery}
        setFilters={setFilters}
        setSearchQuery={setSearchQuery}
        setTargetFilters={setTargetFilters}
        targetFilters={targetFilters}
      />
      <ul className="flex flex-col">
        <li
          className={"grid text-left py-2 px-4 bg-gray-100"}
          style={{ gridTemplateColumns: "1fr 1fr 5fr 5fr" }}
        >
          <p>ID</p>
          <p>Status</p>
          <p>Namn</p>
          <p>Offer</p>
        </li>
        {filterUsers(users, filters, targetFilters, backup)
          .filter((s) => filterOnSearchQuery(searchQuery, s))
          .map((user, idx) => (
            <UserPreview
              backup={backup}
              idx={idx}
              user={backup.users.find((i) => i.id === user.user.id)!}
            />
          ))}

        {/*backup.users
          .sort((a, b) => a.id - b.id)
          .map((user, i) => (
            <UserPreview backup={backup} idx={i} user={user} />
		  ))*/}
      </ul>
    </div>
  );
}

export default List;
