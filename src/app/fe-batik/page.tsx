import PembungkusSidebar from "../components/pembungkusSidebar";
import { cookies } from "next/headers";
import BatikCode from "../components/batikUseAgain/BatikCode";
import BatikTitle from "../components/batikUseAgain/HeaderCompoenents";
import Link from "next/link";
export interface BatikItem {
  typeBatik: string;
  stockBatikAwal: number;
  jenisBatik: string;
  id: number;
  waktuBikin: any;
}

const columns = [
  { title: "TYPE BATIK", key: "typeBatik" },
  { title: "CATEGORY", key: "jenisBatik" },
  { title: "SISA STOCK BATIK", key: "stockBatikAwal" },
  { title: "Pembelian", key: "id", isLink: true },
];

export const convertTime = (data: string) => {
  const hasil = new Date(data);
  const format = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(hasil);

  return format;
};

export async function getBatikAll(): Promise<BatikItem[]> {
  const cookiesss = cookies();
  const res = await fetch(`http://localhost:3001/batiks/getDataBatik`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookiesss.get("jwt")?.value}`,
    },
    next: { tags: ["customer"] },
    credentials: "include",
  });

  const data = await res.json();

  return data.map((item: BatikItem) => {
    return { ...item, waktuBikin: convertTime(item.waktuBikin) };
  });
}

export const BatikPage = async () => {
  const hasil = await getBatikAll();
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

      <BatikCode
        linkCustomss={"Pembelian"}
        columns={columns}
        data={hasil}
        socket="batik_update"
        port="3001"
        linkBasePath={`/fe-batik`}
      />
    </PembungkusSidebar>
  );
};

export default BatikPage;
