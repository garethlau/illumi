import React, { useContext, useEffect, useState, createContext } from "react";
import { createBrowserHistory } from "history";

const IllumiContext = createContext<{
  selections: Record<string, string>;
  url: string;
  updateSelection: (name: string, value: string) => void;
  addSelection: (name: string, value: string) => void;
  removeSelection: (name: string) => void;
} | null>(null);

export interface Config {
  url?: string;
  removeOnMount?: boolean;
}

export interface IllumiProps {
  children: React.ReactNode;
  config?: Config;
}

export const Illumi: React.FC<IllumiProps> = ({ children, config = {} }) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const { url = "", removeOnMount = true } = config;

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
    const history = createBrowserHistory();
    const searchParams = new URLSearchParams(window.location.search);
    let illumi;

    // Attempt to get configuration from URL
    const encoded = searchParams.get("illumi");

    if (encoded) {
      // Encoded configuration object is in the URL
      // Decode config object
      const decoded = atob(encoded);

      // Save to storage
      localStorage.setItem("illumi", decoded);
      illumi = JSON.parse(decoded);
    } else {
      // No config object in URL, check storage
      const item = localStorage.getItem("illumi");
      if (!item) return; // No config object in storage
      illumi = JSON.parse(item);
    }

    if (!illumi) {
      // No config object
      return;
    }

    if (illumi.clear) {
      // Clear previously saved configurations
      localStorage.removeItem("illumi");
    } else {
      // Use configuration to select variants
      setSelections(illumi.selections);
    }

    if (removeOnMount) {
      // Remove the configuration search param
      searchParams.delete("illumi");
      history.replace({ search: searchParams.toString() });
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
