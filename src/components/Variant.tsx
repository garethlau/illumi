import React from "react";

interface VariantProps {
  name: string;
  children: React.ReactNode;
  default?: boolean;
}

export const Variant: React.FC<VariantProps> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};
