import styled from "styled-components";

export const TextField = styled.input`
  font-size: 16px;
  padding: 10px;
  background: transparent;
  border: 1px solid #5678ab;
  border-radius: 3px;
  outline: none;
  ::placeholder {
    color: #5678ab;
    opacity: 0.8;
  }
`;
