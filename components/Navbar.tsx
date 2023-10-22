import MobileSidebar from "@/components/MobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="flex items-center p4">
      <div className="md:hidden">
        <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
