import Link from "next/link";

interface DynamicTAbel {
  customer?: { namaCustomer: string };
  quantity?: number | string;
  batik?: { typeBatik: string };
  tanggalString?: string;
  nomorBon?: string;
  id: string;
}

interface Props {
  data: DynamicTAbel[];
}

export default function PembelianPageTabel({ data }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NO
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Customer
            </th>
            <th scope="col" className="px-6 py-3">
              Type Batik
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Waktu Pembelian
            </th>
            <th scope="col" className="px-6 py-3">
              Nomor Bon
            </th>
            <th scope="col" className="px-6 py-3">
              Edit nomor bon
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            return (
              <tr
                key={idx}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{idx + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.customer?.namaCustomer || "Tanpa Nama"}
                </th>
                <td className="px-6 py-4">{item.batik?.typeBatik}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.tanggalString}</td>
                <td className="px-6 py-4">{item.nomorBon}</td>
                <td className="px-6 py-4">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={`fe-datapembelian/editBon/${item.id}`}
                  >
                    Edit Bon
                  </Link>
                </td>
              </tr>
            );
          })}

          {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
