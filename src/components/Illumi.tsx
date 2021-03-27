import React, { useContext, useEffect, useState, createContext } from "react";

export interface Config {
  selections: Record<string, string>;
}

const ConfigContext = createContext<Config | null>(null);

interface IllumiProps {
  children: React.ReactNode;
}

export const Illumi: React.FC<IllumiProps> = ({ children }) => {
  const [selections, setSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    // Attempt to get configuration from URL
    const searchParams = new URLSearchParams(window.location.search);
    const encoded = searchParams.get("illumi");
    let config;
    if (encoded) {
      const decoded = atob(encoded);
      localStorage.setItem("illumi", decoded);
      config = JSON.parse(decoded);
      setSelections(config.selections);
      return;
    }
    // Attempt to get config from local storage
    const item = localStorage.getItem("illumi");
    if (!item) return;
    config = JSON.parse(item);
    setSelections(config.selections);
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        selections,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export function useSelection(name: string) {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useSelection must be used within Illumi component.");
  }
  return context.selections[name];
}
