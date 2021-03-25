import React, { useMemo } from "react";
import { useSelection } from "./Illumi";

interface SelectorProps {
  name: string;
  children: React.ReactNode;
}

export const Selector: React.FC<SelectorProps> = ({ name, children }) => {
  const selection = useSelection(name);

  const selectedVariant = useMemo(() => {
    return React.Children.toArray(children).filter((child) => {
      if (
        React.isValidElement<{ name: string }>(child) &&
        child.props.name === selection
      ) {
        return true;
      }
      return false;
    });
  }, [children, selection]);

  if (React.Children.count(children) === 1) {
    return <span>{children}</span>;
  } else if (!selection) {
    return (
      <span selector-name={name}>{React.Children.toArray(children)[0]}</span>
    );
  } else {
    return <span selector-name={name}>{selectedVariant}</span>;
  }
};
