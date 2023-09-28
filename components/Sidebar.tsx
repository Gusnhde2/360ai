"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/public/logo.svg";
import DashboardIcon from "@/public/dashboard.svg";
import ConversationIcon from "@/public/conversation.svg";
import ImageIcon from "@/public/image.svg";
import VideoIcon from "@/public/video.svg";
import MusicIcon from "@/public/music.svg";
import CodeIcon from "@/public/code.svg";
import SettingsIcon from "@/public/settings.svg";

const routes = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
  },
  {
    label: "Conversation",
    icon: ConversationIcon,
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 text-white h-full mx-4 my-6">
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
              className={`flex items-center gap-4 p-3 cursor-pointer hover:bg-white/10 rounded-lg text-sm font-medium transition ${
                pathname === route.href && "bg-white/10"
              }`}
              href={route.href}
            >
              <Image src={route.icon} alt="icon" />
              {route.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
