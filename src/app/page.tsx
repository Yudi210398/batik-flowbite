import Image from "next/image";
import PembungkusSidebar from "./components/pembungkusSidebar";
import { Suspense } from "react";

interface CustomerInterface {
  namaCustomer: string;
  no: number;
}

async function getCustomerALl(): Promise<CustomerInterface[]> {
  const res = await fetch(`http://localhost:3001/api/customer`, {
    method: "GET",
    next: { tags: ["customer"] },
  });

  return (await res).json();
}
export default async function Home() {
  const hasil = await getCustomerALl();
  console.log(hasil);
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        {/* <!-- ... --> */}
        <div className="justify-self-center">
          <h6 className="text-center font-serif text-3xl">DATA CUSTOMER </h6>

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
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                NAMA CUSTOMER
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
                Riwayat Beli
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
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">{data.namaCustomer}</td>
                  <td className="px-6 py-4">
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
}
