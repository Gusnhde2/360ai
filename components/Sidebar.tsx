"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { routes } from "@/constants";
import Logo from "@/public/logo.svg";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 text-white h-full px-4 py-6 bg-gray-900 z-50 ">
      <div className="flex items-center gap-6">
        <Image
          src={Logo}
          alt="logo"
          style={{ width: "2rem", height: "2rem" }}
        />
        <h1 className="text-2xl font-bold">360AI</h1>
      </div>
      <div className="flex flex-col  my-5 gap-4">
        {routes.map((route) => {
          return (
            <Link
              key={route.label}
              className={`flex items-center gap-4 p-3 cursor-pointer hover:bg-white/10 rounded-lg text-sm font-medium transition ${
                pathname === route.href && "bg-white/10"
              }`}
              href={route.href}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    "h-5 w-5 mr-3",
                    pathname === route.href && route.color
                  )}
                />
                {route.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
