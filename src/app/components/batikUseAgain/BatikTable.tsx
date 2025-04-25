"use client";

import Link from "next/link";
import useHttp from "../util/http-hook";

interface Column {
  title: string;
  key: string;
}

interface DynamicTable {
  columns: Column[];
}

export const BatikTable: React.FC<DynamicTable> = ({ columns }) => {
  const { realTimeData } = useHttp("batik_update", "3001");

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {"NO"}
            </th>
            {columns.map((data: any, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {data.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {realTimeData.map((item, i) => {
            return (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{i + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.typeBatik.toUpperCase()}
                </th>
                <td className="px-6 py-4">{item.jenisBatik}</td>
                <td className="px-6 py-4">{item.stockSaatIni}</td>
                <td className="px-6 py-4">
                  <Link
                    className="text-blue-600 hover:underline"
                    href={`/fe-batik/${item.id}`}
                  >
                    Pembelian
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
