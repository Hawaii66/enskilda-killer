import List from "@/components/blogg/List";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex items-center flex-col">
      <List />
    </div>
  );
}
