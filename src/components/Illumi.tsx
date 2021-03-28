import React, { useContext, useEffect, useState, createContext } from "react";
import { ConfigPanel } from "./ConfigPanel";

const IllumiContext = createContext<{
  selections: Record<string, string>;
  url: string;
  updateSelection: (name: string, value: string) => void;
  addSelection: (name: string, value: string) => void;
  removeSelection: (name: string) => void;
} | null>(null);

export interface IllumiProps {
  children: React.ReactNode;
  config?: {
    url?: string;
    removeOnMount?: boolean;
  };
}

export const Illumi: React.FC<IllumiProps> = ({ children, config = {} }) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const { url = "" } = config;

  function updateSelection(name: string, value: string) {
    setSelections((prev) => ({ ...prev, [name]: value }));
  }
  function addSelection(name: string, value: string) {
    setSelections((prev) => ({ ...prev, [name]: value }));
  }
  function removeSelection(name: string) {
    setSelections((prev) => {
      const { [name]: tmp, ...rest } = prev;
      return rest;
    });
  }

  useEffect(() => {
    // Attempt to get configuration from URL
    const searchParams = new URLSearchParams(window.location.search);
    const encoded = searchParams.get("illumi");
    let config;
    if (encoded) {
      const decoded = atob(encoded);
      localStorage.setItem("illumi", decoded);
      config = JSON.parse(decoded);
      if (config.clear) {
        // Clear saved selections
        localStorage.removeItem("illumi");
      } else {
        setSelections(config.selections);
      }
    } else {
      // Attempt to get config from local storage
      const item = localStorage.getItem("illumi");
      if (!item) return;
      config = JSON.parse(item);
      setSelections(config.selections);
    }
  }, []);

  return (
    <IllumiContext.Provider
      value={{
        selections,
        url,
        addSelection,
        updateSelection,
        removeSelection,
      }}
    >
      {children}
      {process.env.NODE_ENV !== "production" && <ConfigPanel />}
    </IllumiContext.Provider>
  );
};

export function useIllumi() {
  const context = useContext(IllumiContext);
  if (!context) {
    throw new Error("useIllumi must be used within Illumi component.");
  }
  return context;
}

export function useSelection(name: string) {
  const context = useContext(IllumiContext);
  if (!context) {
    throw new Error("useSelection must be used within Illumi component.");
  }
  return context.selections[name];
}
