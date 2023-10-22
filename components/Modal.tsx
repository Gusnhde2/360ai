"use client";

import { RocketIcon, ShieldXIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SubscriptionButton } from "./SubscriptionButton";

interface ModalProps {
  title?: string;
  message?: string;
  status?: number;
  isPro?: boolean;
  closeModal: () => void;
}

export default function Modal({
  title,
  message,
  status,
  isPro,
  closeModal,
}: ModalProps) {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="w-11/12 h-11/12 md:w-1/3 md:h-1/3 bg-white rounded-lg">
        <div className="flex flex-col items-center justify-center p-8 w-full h-full gap-8">
          <div className="text-9xl">
            <ShieldXIcon />
          </div>

          <div className="w-full text-center">
            <div className="text-gray-900 font-medium text-lg ">
              {title ? title : "Something went wrong"}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full text-center">
            <div className="w-full text-gray-700 text-sm font-medium">
              {message}
            </div>
            <div className="flex w-full justify-center gap-2">
              {!isPro && <SubscriptionButton isPro={isPro || false} />}
              <Button onClick={closeModal}>Go back</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
