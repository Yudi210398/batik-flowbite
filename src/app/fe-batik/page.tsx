"use client";

import PembungkusSidebar from "../components/pembungkusSidebar";
// import { cookies } from "next/headers";
import BatikTitle from "../components/batikUseAgain/HeaderCompoenents";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { BatikTable } from "../components/batikUseAgain/BatikTable";
import { DataTable } from "./data-table";
import useHttp from "../components/util/http-hook";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageErrorComponen from "../components/errorComponentWrongInput/ErrorComponrnt";

export interface BatikItem {
  typeBatik: string;
  stockBatikAwal: number;
  jenisBatik: string;
  id: number;
  waktuBikin: any;
}

export const convertTime = (data: string) => {
  const hasil = new Date(data);
  const format = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(hasil);

  return format;
};

export const BatikPage = () => {
  const [openDialogId, setOpenDialogId] = useState(null);
  const router = useRouter();
  const { realTimeData } = useHttp("batik_update", "3001", openDialogId);
  const { sendReq, setErrorValidate, pesanVerify, errorValidate } = useHttp();

  const submitFungsi = async () => {
    try {
      setErrorValidate(false);

      const result = await sendReq(
        `http://localhost:3001/batiks/deletebatik/${openDialogId}`,
        "DELETE"
      );
      result && alert("data berhasil di hapus") && router.refresh();
    } catch (err: any) {
      setErrorValidate(err);
    } finally {
      console.log(`fungsi bisa`);
    }
  };

  const column = [
    { accessorKey: "typeBatik", header: "Type Batik" },
    { accessorKey: "jenisBatik", header: "Jenis Batik" },
    {
      accessorKey: "stockSaatIni",
      header: "Stock Saat Ini",
      cell: ({ row }: any) => {
        const getData = row.getValue("stockSaatIni");
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
      cell: ({ row }: { row: any }) => {
        const getData = row.getValue("id");
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="hover:cursor-pointer"
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
                <DropdownMenuItem
                  className="hover:cursor-pointer hover:underline"
                  onClick={() => setOpenDialogId(getData)}
                >
                  <span className="text-red-500">Hapus</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-3 gap-4">
        <BatikTitle title="DATA batik" />
        <div>
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cari Batik"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cari Data
              </button>
            </div>
          </form>

          <hr />
        </div>
        <div className="justify-self-center mt-3">
          <Link
            href={"fe-batik/tambahData"}
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Tambah Data
          </Link>
        </div>
        {/* <!-- ... -->
  <!-- ... -->  
  <!-- ... -->
  <!-- ... --> */}
      </div>
      <br />
      <br />
      <div className="flex items-center justify-center grid-cols-2 gap-2">
        {errorValidate && (
          <PageErrorComponen
            pesanVerify={pesanVerify}
            setErrorValidate={setErrorValidate}
          />
        )}
      </div>

      {/* <BatikTable columns={columns} /> */}
      <DataTable data={realTimeData} columns={column} />
      {/* Modal */}

      <AlertDialog
        open={!!openDialogId}
        onOpenChange={(open) => !open && setOpenDialogId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin mau hapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Data bakal lenyap kayak utang gak dibayar. Gas?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialogId(null)}>
              Gak Jadi
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                submitFungsi();
              }}
            >
              Hapus Aja!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PembungkusSidebar>
  );
};

export default BatikPage;
