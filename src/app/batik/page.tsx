import { Suspense } from "react";
import PembungkusSidebar from "../components/pembungkusSidebar";

interface BatikItem {
  typeBatik: string;
  totalBatik: number;
  jenisBatik: string;
}

async function getBatikAll(): Promise<BatikItem[]> {
  const res = await fetch(`http://localhost:3001/api/batiks`, {
    method: "GET",
    next: { tags: ["product"] },
  });

  return (await res).json();
}

export const BatikPage = async () => {
  const hasil = await getBatikAll();
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        {/* <!-- ... --> */}
        <div className="justify-self-center">
          <h6 className="text-center font-serif text-3xl">DATA BATIK</h6>

          <hr />
        </div>

        {/* <!-- ... -->
  <!-- ... --> 
  <!-- ... -->
  <!-- ... --> */}
      </div>

      <br />
      <br />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                TYPE BATIK
              </th>
              <th scope="col" className="px-6 py-3">
                CATEGORY
              </th>

              <th scope="col" className="px-6 py-3">
                TOTAL BATIK
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <Suspense fallback={<p className="text-center">Loading</p>}>
            <tbody>
              {hasil?.map((data, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.typeBatik}
                  </th>
                  <td className="px-6 py-4">{data.jenisBatik}</td>
                  <td className="px-6 py-4">{data.totalBatik}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Pembelian
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Suspense>
        </table>
      </div>
    </PembungkusSidebar>
  );
};

export default BatikPage;
