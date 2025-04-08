import Link from "next/link";
import BatikTitle from "../components/batikUseAgain/HeaderCompoenents";
import PembungkusSidebar from "../components/pembungkusSidebar";
import { cookies } from "next/headers";
import BatikCode from "../components/batikUseAgain/BatikCode";
import PembelianPageTabel from "../components/pembelianBatikTabel/TabelPembelian";

const columns = [
  { title: "Nama Customer", key: "customer.namaCustomer" },
  { title: "Quantity", key: "quantity" },
  { title: "Type Batik", key: "batik.typeBatik" },
  { title: "Waktu Pembelian", key: "tanggalString" },
  { title: "Nomor Bon", key: "nomorBon" },
  { title: "Edit nomor bon", key: "id", isLink: true },
];

export interface Pembelian {
  customer: { namaCustomer: string };
  quantity: number;
  typeBatik: string;
  waktuBikin: string;
  nomorBon: string;
  id: string;
}

export async function getBatikPembelian(): Promise<Pembelian[]> {
  const cookiesss = cookies();

  const res = await fetch(
    "http://localhost:3001/batiks/getDataBatikPembelian",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookiesss.get("jwt")?.value}`,
      },
      credentials: "include",
    }
  );
  return res.json();
}

export default async function DataPembayaran() {
  const hasil = await getBatikPembelian();
  return (
    <PembungkusSidebar>
      {hasil.length > 0 && (
        <div className="wrapper">
          <div className="grid grid-cols-3 gap-4">
            <BatikTitle title="DATA Pembelian" />
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
                href={"/fe-order"}
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

          <PembelianPageTabel data={hasil} />
        </div>
      )}
      {hasil.length < 1 && (
        <div className="grid grid-cols-1 gap-4">
          <BatikTitle title="DATA Pembelian Batik Tidak Ada" />
        </div>
      )}
    </PembungkusSidebar>
  );
}
