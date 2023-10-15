import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/MobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function Navbar() {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="flex items-center p4">
      <div className="md:hidden">
        <MobileSidebar apiLimitCount={apiLimitCount} />
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
