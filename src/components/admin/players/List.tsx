"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useContext, useState } from "react";
import UserRenderer from "./UserRenderer";
import { PlayerInfo } from "@/interfaces/Admin";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectUser from "@/components/SelectUser";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/useApi";
import { TargetUser } from "@/interfaces/User";
import SelectCircle from "@/components/SelectCircle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllCirclesContext } from "@/contexts/AllCirclesContext";
import { AllGroupsContext } from "@/contexts/AllGroupsContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Circle } from "@/interfaces/Circle";
import MovePlayers from "./MovePlayers";
import { useBasicToast } from "@/hooks/useBasicToast";
import { User } from "@clerk/nextjs/server";

type Props = {
  users: PlayerInfo[];
  clerks: string[];
};

type Filters = {
  orderBy: "id" | "forename" | "lastname" | "kills" | "group";
  onlyShow:
    | { circle: string }
    | "alive"
    | "dead"
    | "all"
    | "notMember"
    | { group: string };
};

function List({ users: defaultUsers, clerks }: Props) {
  const [users, setUsers] = useState(defaultUsers);
  const [murderMode, setMurderMode] = useState<"ghost" | "murderer">(
    "murderer"
  );
  const [murderer, setMurderer] = useState<TargetUser>();
  const [target, setTarget] = useState<TargetUser>();
  const [circle, setCircle] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<Filters>({
    orderBy: "id",
    onlyShow: "all",
  });

  const apiFetch = useApi();
  const { toast, toastTitle } = useBasicToast();
  const circles = useContext(AllCirclesContext);
  const groups = useContext(AllGroupsContext);

  const updateUsers = async () => {
    const response = await apiFetch("/api/admin/players", { method: "GET" });
    if (response.status === 200) {
      setUsers(await response.json());
    } else {
      toast("Kunde inte hämta spelare");
    }
  };

  const murder = async () => {
    if (!target) return;
    const data =
      murderer === undefined
        ? {
            target: target.id,
            circle,
          }
        : {
            target: target.id,
            circle,
            murderer: murderer.id,
          };

    const response = await apiFetch("/api/admin/murder", {
      method: "POST",
      body: data,
    });
    if (response.status === 200) {
      await updateUsers();
      toastTitle("Mordet gick igenom", "Ladda om sidan för att se resultaten");
    } else {
      toast("Kunde inte mörda spelaren");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Alla spelare</CardTitle>
          <CardDescription>
            Filtrera spelarna eller visa alla anmälda personer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden ">
            <div className="w-1/4 flex flex-row gap-4 mt-2 mb-4">
              <Label className="w-1/2 grid place-items-center">
                Sortera efter
              </Label>
              <Select
                onValueChange={(s) =>
                  setFilters({ ...filters, orderBy: s as any })
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    {orderByKeyToString(filters.orderBy)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sortera efter</SelectLabel>
                    <SelectItem value="id">Id</SelectItem>
                    <SelectItem value="forename">Förnamn</SelectItem>
                    <SelectItem value="lastname">Efternamn</SelectItem>
                    <SelectItem value="kills">Mord</SelectItem>
                    <SelectItem value="group">Klass</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/4 flex flex-row gap-4 mb-4">
              <Label className="w-1/2 grid place-items-center">
                Visa endast
              </Label>
              <Select
                onValueChange={(s) => {
                  if (s.startsWith("main-")) {
                    setFilters({
                      ...filters,
                      onlyShow: s.replace("main-", "") as any,
                    });
                  }
                  if (s.startsWith("group-")) {
                    setFilters({
                      ...filters,
                      onlyShow: {
                        group: s.replace("group-", ""),
                      },
                    });
                  }
                  if (s.startsWith("circle-")) {
                    setFilters({
                      ...filters,
                      onlyShow: {
                        circle: s.replace("circle-", ""),
                      },
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>
                    {showOnlyKeyToString(filters.onlyShow, circles)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[40vh]">
                    <SelectGroup>
                      <SelectLabel>- Stora -</SelectLabel>
                      <SelectItem value="main-all">Alla</SelectItem>
                      <SelectItem value="main-alive">Levande</SelectItem>
                      <SelectItem value="main-dead">Döda</SelectItem>
                      <SelectItem value="main-notMember">
                        Inte medlem i kåren
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>- Cirkel - </SelectLabel>
                      {circles.map((circle) => (
                        <SelectItem value={`circle-${circle.id}`}>
                          {circle.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>- Klass -</SelectLabel>
                      {groups.map((group) => (
                        <SelectItem value={`group-${group}`}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/4 flex flex-row gap-4 mb-4">
              <Label className="w-1/2 grid place-items-center">Sök</Label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div
              className={`flex flex-row gap-4 py-2 px-2 bg-slate-100 underline`}
            >
              <div className="w-1/6 flex flex-row justify-between">
                <p>Id</p>
                <p>Status</p>
              </div>
              <p className="w-2/6">Användare</p>
              <p className="w-2/6">Target</p>
              <div className="w-1/6 flex flex-row justify-end items-center">
                Ändra
              </div>
            </div>
            {filterUsers(users, filters)
              .filter((s) => filterOnSearchQuery(searchQuery, s))
              .map((user, idx) => (
                <UserRenderer
                  refresh={() => updateUsers()}
                  key={user.user.id}
                  index={idx}
                  user={user}
                />
              ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Har bara loggat in</CardTitle>
          <CardDescription>
            De som bara har loggat in, inte anmält sig
          </CardDescription>
        </CardHeader>
        <CardContent className="rounded-lg overflow-hidden">
          {clerks
            .filter((i) => !users.map((j) => j.user.email).includes(i))
            .map((user) => (
              <p>{user}</p>
            ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Genomför mord</CardTitle>
          <CardDescription>
            Genomför manuella mord för att till exempel lösa tvistemål
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Tabs
            onValueChange={(tab) => setMurderMode(tab as any)}
            defaultValue={"murderer"}
          >
            <TabsList>
              <TabsTrigger value="murderer">Mördare mördar</TabsTrigger>
              <TabsTrigger value="ghost">Offret dör</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-row gap-4" value="murderer">
              <Label className="flex justify-center items-center w-28">
                Mördare
              </Label>
              <SelectUser onChangeUser={setMurderer} />
            </TabsContent>
            <TabsContent value="ghost">
              <p>Mördaren till offret kommer inte få ett nytt offer</p>
            </TabsContent>
          </Tabs>
          <div className="flex flex-grow gap-4">
            <Label className="flex justify-center items-center w-28">
              Offer
            </Label>
            <SelectUser onChangeUser={setTarget} />
          </div>
          <div className="flex flex-grow gap-4">
            <Label className="flex justify-center items-center w-28">
              Cirkel
            </Label>
            <div className="w-[200px]">
              <SelectCircle onChangeCircle={(c) => setCircle(c.id)} />
            </div>
          </div>
          <Button onClick={murder} className="w-1/5" variant={"outline"}>
            Mörda
          </Button>
        </CardContent>
      </Card>
      <MovePlayers refresh={updateUsers} />
    </div>
  );
}

export default List;

const filterUsers = (users: PlayerInfo[], filters: Filters) => {
  return users
    .filter((u) => filterUser(u, filters))
    .sort((a, b) => sortUser(a, b, filters));
};

const filterUser = (user: PlayerInfo, filters: Filters) => {
  switch (filters.onlyShow) {
    case "all":
      return true;
    case "alive":
      return user.user.circle !== undefined;
    case "dead":
      return user.user.circle === undefined;
    case "notMember":
      return !user.user.isMember;
    default:
      if ("circle" in filters.onlyShow) {
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
    default:
      const _: never = filters.orderBy;
      return 0;
  }
};

const orderByKeyToString = (key: Filters["orderBy"]) => {
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
    default:
      const _: never = key;
      return "";
  }
};

const showOnlyKeyToString = (key: Filters["onlyShow"], circles: Circle[]) => {
  switch (key) {
    case "alive":
      return "Levande";
    case "dead":
      return "Döda";
    case "all":
      return "Alla";
    case "notMember":
      return "Inte medlem i kåren";
    default:
      if ("circle" in key) {
        return circles.find((i) => i.id.toString() === key.circle)?.name || "";
      }
      return key.group;
  }
};

const filterOnSearchQuery = (query: string, player: PlayerInfo) => {
  const {
    user: { email, firstname, group, id, lastname, phone },
  } = player;

  return (
    email.toLowerCase().includes(query.toLowerCase()) ||
    firstname.toLowerCase().includes(query.toLowerCase()) ||
    group.toLowerCase().includes(query.toLowerCase()) ||
    id.toString().includes(query.toLowerCase()) ||
    lastname.toLowerCase().includes(query.toLowerCase()) ||
    phone.toLowerCase().includes(query.toLowerCase())
  );
};
