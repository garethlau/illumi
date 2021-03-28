import React from "react";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 24px;
`;
const P = styled.p`
  font-size: 16px;
`;

interface TypographyProps {
  variant?: "h1" | "p";
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
}) => {
  if (variant === "h1") {
    return <H1>{children}</H1>;
  } else if (variant === "p") {
    return <P>{children}</P>;
  }
  return <span>{children}</span>;
};
