import React, { useMemo } from "react";
import { useSelection } from "./Illumi";

interface SelectorProps {
  name: string;
  children: React.ReactNode;
}

export const Selector: React.FC<SelectorProps> = ({ name, children }) => {
  const selection = useSelection(name);
  const childArray = useMemo(() => React.Children.toArray(children), [
    children,
  ]);

  const selectedVariant = useMemo(() => {
    return childArray.filter((child) => {
      if (
        React.isValidElement<{ name: string }>(child) &&
        child.props.name === selection
      ) {
        return true;
      }
      return false;
    });
  }, [childArray, selection]);

  const fallback = useMemo(() => {
    const elems = childArray.filter((child) => {
      // Check for default element to fallback to
      if (
        React.isValidElement<{ default: boolean }>(child) &&
        !!child.props.default
      ) {
        return true;
      }
      return false;
    });
    if (elems.length === 1) {
      return elems[0];
    }
    return null;
  }, [childArray]);

  if (React.Children.count(children) === 1) {
    return <span>{children}</span>;
  } else if (selection) {
    return <span selector-name={name}>{selectedVariant}</span>;
  } else if (fallback) {
    // Fallback to default variant
    return <span>{fallback}</span>;
  } else {
    // No default specified, fallback to first element
    return <span selector-name={name}>{childArray[0]}</span>;
  }
};
