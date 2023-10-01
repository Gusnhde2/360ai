"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.svg";

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
          options={{
            background: {
              color: {
                value: "#fff",
              },
            },
            fpsLimit: 500,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#222",
              },
              links: {
                color: "#222",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 1000,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
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
