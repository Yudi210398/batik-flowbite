import { cookies } from "next/headers";
import PembungkusSidebar from "../components/pembungkusSidebar";
import { Suspense } from "react";
import BatikCode from "../components/batikUseAgain/BatikCode";
import BatikTitle from "../components/batikUseAgain/HeaderCompoenents";
import Link from "next/link";
export interface CustomerInterface {
  customer: any;
  namaCustomer: string;

  id: number;
}

const columns = [
  { title: "Nama Customer", key: "namaCustomer" },
  { title: "Nomor Telepon ", key: "nomorTelp" },
  { title: "Pembelian", key: "id", isLink: true },
];

export async function getCustomerALl(): Promise<CustomerInterface[]> {
  const cookiesss = cookies();
  const res = await fetch(`http://localhost:3001/customer`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookiesss.get("jwt")?.value}`,
    },
    next: { tags: ["customer"] },
    credentials: "include",
  });

  return res.json();
}

export default async function Customer() {
  const hasil = await getCustomerALl();
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-3 gap-4">
        {/* <!-- ... --> */}
        <BatikTitle title="DATA Customer" />

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
                placeholder="Cari Customer"
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
            href={"fe-customer/tambahData"}
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

      <BatikCode
        linkCustomss={"Pembelian"}
        columns={columns}
        data={hasil}
        port="3003"
        socket="customer_update"
        linkBasePath={`/fe-customer`}
      />
    </PembungkusSidebar>
  );
}
