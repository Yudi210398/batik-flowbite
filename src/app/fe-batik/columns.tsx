"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type BatikData = {
  no: number;
  typeBatik: string;
  jenisBatik: string;
  stockSaatIni: number;
  pembelian: string;
};

export const columns: ColumnDef<BatikData>[] = [
  {
    accessorKey: "typeBatik",
    header: "Type Batik",
  },
  {
    accessorKey: "jenisBatik",
    header: "Jenis Batik",
  },
  {
    accessorKey: "stockSaatIni",
    header: "Stock Saat Ini",
    cell: ({ row }) => {
      const getData = row.getValue("stockSaatIni") as number;
      return (
        <div>
          <h1 className="ml-10">{getData}</h1>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Pembelian",
    cell: ({ row }) => {
      const getData = row.getValue("id") as number;
      return (
        <div className="text-blue-500 hover:underline hover:cursor-pointer">
          <Link href={`fe-batik/${getData}`}>Pembelian</Link>
        </div>
      );
    },
  },
];
