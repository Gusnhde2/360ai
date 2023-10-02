import Image from "next/image";

import LogoBack from "@/public/logo-back.svg";
import LogoFront from "@/public/logo-front.svg";

export default function LoadingSpinner() {
  return (
    <div style={{ position: "relative" }}>
      <Image src={LogoBack} alt="logo" />
      <Image
        src={LogoFront}
        alt="logo"
        className="loadingSpinner"
        style={{ position: "absolute", top: "0" }}
      />
    </div>
  );
}
