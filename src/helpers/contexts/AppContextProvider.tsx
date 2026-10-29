"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";

export type ModalType = "upload" | "clean" | "auth" | null;

interface AppContextType {
  modal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  toastMessage: string | null;
  notify: (msg: string) => void;
  closeToast: () => void;
}

export const AppContext = createContext<AppContextType>({
  modal: null,
  openModal: () => {},
  closeModal: () => {},
  toastMessage: null,
  notify: () => {},
  closeToast: () => {},
});

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openModal = (type: ModalType) => setModal(type);
  const closeModal = () => setModal(null);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const closeToast = () => setToastMessage(null);

  return (
    <AppContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        toastMessage,
        notify,
        closeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
