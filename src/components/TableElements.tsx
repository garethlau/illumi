import styled from "styled-components";

export const TableData = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
export const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const TableRow = styled.tr``;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  ${TableRow}:nth-child(even) {
    background-color: #edf3f8;
  }
`;

export const TableBody = styled.tbody``;

export const TableHead = styled.thead``;

export const TableFoot = styled.tfoot``;
