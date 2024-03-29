"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileSidebar({
  apiLimitCount,
  isPro,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetClose asChild>
          <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
