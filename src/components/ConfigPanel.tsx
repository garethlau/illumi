import React, { useState, useMemo } from "react";
import { useConfig } from "./Illumi";
import { Button } from "./Button";
import { TextField } from "./TextField";
import { Typography } from "./Typography";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  border: 3px solid #5678ab;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;
const TableData = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const TableHead = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const TableRow = styled.tr``;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  ${TableRow}:nth-child(even) {
    background-color: #edf3f8;
  }
`;

const LinkContainer = styled.div`
  overflow-x: auto;
  background-color: #edf3f8;
  padding: 5px;
`;

export const ConfigPanel: React.FC<{}> = () => {
  const {
    selections,
    removeSelection,
    updateSelection,
    addSelection,
    url,
  } = useConfig();

  const [newSelection, setNewSelection] = useState<string[]>(["", ""]);
  const magicUrl = useMemo<string>(() => {
    const config = { selections: selections };
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
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
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
          <TableRow>
            <TableData>
              <TextField
                type="text"
                value={newSelection[0]}
                placeholder="Name"
                onChange={(e) =>
                  setNewSelection((prev) => [e.target.value, prev[1]])
                }
              />
            </TableData>
            <TableData>
              <TextField
                type="text"
                placeholder="Value"
                value={newSelection[1]}
                onChange={(e) =>
                  setNewSelection((prev) => [prev[0], e.target.value])
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
        </Table>
      </TableContainer>
    </Container>
  );
};
