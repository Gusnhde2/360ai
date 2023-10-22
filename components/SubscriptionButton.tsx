"use client";

import { useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/stripe", {
        method: "GET",
      }).then((res) => res.json());
      window.location.href = response.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant={isPro ? "default" : "premium"}
      disabled={loading}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
