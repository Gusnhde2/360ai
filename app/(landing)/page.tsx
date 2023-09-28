"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button
        onClick={() => {
          alert("alejkmu selam, ahbabu");
        }}
        variant="default"
      >
        Selam alejk
      </Button>
    </div>
  );
}
