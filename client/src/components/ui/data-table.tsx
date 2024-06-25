"use client";
import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "./input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "table" | "card";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  variant = "table",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    debugAll: false,
    state: {
      sorting,
      columnFilters,
      globalFilter: filtering,
    },
    onGlobalFilterChange: (value) => {
      setFiltering(value);
    },
  });
  if (variant === "table") {
    return (
      <div>
        <div className="flex items=center py-4">
          {/* Global Filter Search for a table (searching all columns) */}
          <Input
            placeholder="Search"
            // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    );
  } else if (variant === "card") {
    // return <Card></Card>;
    return (
      <div>
        <div className="flex items=center py-4">
          {/* Global Filter Search for a table (searching all columns) */}
          <Input
            placeholder="Search"
            // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="grid grid-rows-3 grid-cols-4 gap-4 p-7">
          {table.getRowModel().rows.map((row) => (
            <Card key={row.id}>
              <CardContent className="flex flex-row p-6">
                {/* {flexRender(
                  row.getVisibleCells()[0].column.columnDef.cell,
                  row.getVisibleCells()[1].getContext()
                )} */}
                {row.getVisibleCells().map((cell) => (
                  <CardDescription key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </CardDescription>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
