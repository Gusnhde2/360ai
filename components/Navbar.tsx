import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center p4">
      <div className="md:hidden">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
