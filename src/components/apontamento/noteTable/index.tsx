"use client";

import { useMemo } from "react";
import { useSelection } from "@/hooks/useSelection";
import { Notation } from "@/types/notation";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

interface NotationTableProps {
  count?: number;
  page?: number;
  rows?: Notation[];
  rowsPerPage?: number;
}

export function NotationTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 5,
}: NotationTableProps) {
  const rowIds = useMemo(() => {
    return rows.map((note) => note.idApontamento);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead sx={{ whiteSpace: "nowrap" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Circuito</TableCell>
              <TableCell>Cabo</TableCell>
              <TableCell>Tag Previsto</TableCell>
              <TableCell>Tag Real</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Fase</TableCell>
              <TableCell>Comprimento (m)</TableCell>
              <TableCell>Compr. 3F (m)</TableCell>
              <TableCell>Seção (mm²)</TableCell>
              <TableCell>M. de Inicio (m)</TableCell>
              <TableCell>M. de Fim (m)</TableCell>
              <TableCell>Total Lançado (m)</TableCell>
              <TableCell>Observação</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ whiteSpace: "nowrap" }}>
            {rows.map((row) => {
              const isSelected = selected?.has(row.idApontamento);

              return (
                <TableRow hover key={row.idApontamento} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.idApontamento);
                        } else {
                          deselectOne(row.idApontamento);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.circuito}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.descricaoCabo}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.tagPrevisto}</TableCell>
                  <TableCell>{row.tagReal}</TableCell>
                  <TableCell>{row.origem}</TableCell>
                  <TableCell>{row.destino}</TableCell>
                  <TableCell>{row.fase}</TableCell>
                  <TableCell>{row.comprimentoFase}</TableCell>
                  <TableCell>{row.comprimentoTotal}</TableCell>
                  <TableCell>{row.secao}</TableCell>
                  <TableCell>{row.metragemInicio}</TableCell>
                  <TableCell>{row.metragemFim}</TableCell>
                  <TableCell>{row.metragemInicio - row.metragemFim}</TableCell>
                  <TableCell>{row.observacao}</TableCell>
                  <TableCell>
                    {new Date(row.dataLancamento).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      {/*<TablePagination
        component="div"
        count={count}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />*/}
    </Card>
  );
}
