import React, { useState, useMemo } from "react";
import { useIllumi } from "./Illumi";
import { Button } from "./Button";
import { TextField } from "./TextField";
import { Typography } from "./Typography";
import styled from "styled-components";
import {
  Table,
  TableData,
  TableHeader,
  TableFoot,
  TableBody,
  TableHead,
  TableRow,
} from "./TableElements";

const LinkContainer = styled.div`
  overflow-x: auto;
  background-color: #edf3f8;
  padding: 5px;
`;

const Container = styled.div`
  padding: 20px;
  border: 3px solid #5678ab;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

export const ConfigPanel: React.FC<{}> = () => {
  const {
    selections,
    removeSelection,
    updateSelection,
    addSelection,
    url,
  } = useIllumi();

  const [newSelection, setNewSelection] = useState<string[]>(["", ""]);
  const magicUrl = useMemo<string>(() => {
    const config = {
      selections,
      clear: Object.keys(selections).length === 0,
    };
    const encoded = btoa(JSON.stringify(config));
    return `${url}?illumi=${encoded}`;
  }, [selections]);

  return (
    <Container>
      <Typography variant="p">Share this link:</Typography>
      <LinkContainer>
        <code>{magicUrl}</code>
      </LinkContainer>
      <Typography variant="h1">Selections</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Value</TableHeader>
              <TableHeader>Options</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(selections).map((name) => (
              <TableRow key={name}>
                <TableData>
                  <Typography>{name}</Typography>
                </TableData>
                <TableData>
                  <TextField
                    type="text"
                    value={selections[name]}
                    onChange={(e) => {
                      updateSelection(name, e.target.value);
                    }}
                  />
                </TableData>
                <TableData>
                  <Button
                    onClick={() => {
                      removeSelection(name);
                    }}
                  >
                    Delete
                  </Button>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableData>
                <TextField
                  type="text"
                  value={newSelection[0]}
                  placeholder="Name"
                  onChange={(e) =>
                    setNewSelection((prev) => [e.currentTarget.value, prev[1]])
                  }
                />
              </TableData>
              <TableData>
                <TextField
                  type="text"
                  placeholder="Value"
                  value={newSelection[1]}
                  onChange={(e) =>
                    setNewSelection((prev) => [prev[0], e.currentTarget.value])
                  }
                />
              </TableData>
              <TableData>
                <Button
                  onClick={() => {
                    addSelection(newSelection[0], newSelection[1]);
                    setNewSelection(["", ""]);
                  }}
                >
                  Add
                </Button>
              </TableData>
            </TableRow>
          </TableFoot>
        </Table>
      </TableContainer>
    </Container>
  );
};
