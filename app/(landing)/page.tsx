"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.svg";

import { config } from "./constants";

import type { Container, Engine } from "tsparticles-engine";
export default function Home() {
  const router = useRouter();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  return (
    <>
      <div className="z-1">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={config}
        />
      </div>
      <div className="flex flex-col items-center gap-3 mt-64">
        <Image src={Logo} alt="logo" className="z-20" />
        <h1 className="text-3xl font-semibold z-20">Welcome to 360AI</h1>
        <Button
          onClick={() => router.push("/dashboard")}
          style={{
            zIndex: "2",
            width: "7rem",
            marginTop: "3rem",
          }}
        >
          Start
        </Button>
      </div>
    </>
  );
}
