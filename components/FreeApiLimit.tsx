import { MAX_FREE_COUNTS } from "@/constants";
import { Button } from "./ui/button";
import { RocketIcon } from "lucide-react";
import Image from "next/image";
import { SubscriptionButton } from "./SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";

interface FreeApiLimitProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function FreeApiLimit({
  apiLimitCount = 0,
  isPro,
}: FreeApiLimitProps) {
  return (
    <div className="flex flex-col gap-5 bg-white/10 py-5 px-5 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Free generations</span>
          <span className="text-sm font-medium text-gray-400">
            {apiLimitCount} / {MAX_FREE_COUNTS}
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${(apiLimitCount / MAX_FREE_COUNTS) * 100}%` }}
          ></div>
        </div>
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}
