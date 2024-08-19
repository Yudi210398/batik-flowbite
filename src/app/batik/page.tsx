import PembungkusSidebar from "../components/pembungkusSidebar";

interface Batik {
  typeBatik: string;
  totalBatik: number;
  jenisBatik: string;
}

async function getBatikAll(): Promise<Batik> {
  const res = await fetch(`http://localhost:3001/api/batik`, { method: "GET" });

  return (await res).json();
}

export const BatikPage = async () => {
  const hasil = await getBatikAll();
  console.log(hasil);
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
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Pembelian
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Pembelian
                </a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Pembelian
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PembungkusSidebar>
  );
};

export default BatikPage;
