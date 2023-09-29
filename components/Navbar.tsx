import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/MobileSidebar";

export default function Navbar() {
  return (
    <div className="flex items-center p4">
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
