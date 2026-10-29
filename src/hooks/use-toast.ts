"use client";

import { useApp } from "@/helpers/contexts/AppContextProvider";

export function useToast() {
  const { toastMessage, notify, closeToast } = useApp();

  return {
    toastMessage,
    notify,
    closeToast,
  };
}
