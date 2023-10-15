import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="relative h-full md:flex">
      <div className="hidden md:flex md:w-72 md:flex-col bg-gray-900 h-full">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <div className="flex flex-col w-full h-full p-3">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}
