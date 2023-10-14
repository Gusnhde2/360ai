import Image from "next/image";

import Logo from "@/public/logo.svg";

export default function LoadingSpinner() {
  return (
    <div className="z-20">
      <Image
        src={Logo}
        alt="logo"
        className="z-30 absolute top-64 animate-spin delay-75	"
      />
    </div>
  );
}
