"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type BatikData = {
  no: number;
  typeBatik: string;
  jenisBatik: string;
  stockSaatIni: number;
  action: string;
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

    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const getData = row.getValue("id") as any;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(getData)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="text-blue-500 hover:underline hover:cursor-pointer">
                <Link href={`fe-batik/${getData}`}>Pembelian</Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
