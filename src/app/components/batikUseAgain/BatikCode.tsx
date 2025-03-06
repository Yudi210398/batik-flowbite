"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import useHttp from "../util/http-hook";

interface Column {
  title: string; // Nama kolom
  key: string;

  // Kunci yang sesuai dengan properti di data
  isLink?: boolean; // Apakah kolom ini berisi link
  objNested?: boolean;
}

interface DynamicTableProps {
  columns: Column[];
  linkCustomss?: string;
  data: any[];
  socket?: string;
  port?: string;
  websocket?: boolean;
  linkBasePath?: string; // Path dasar untuk kolom yang berisi link
}

const getNestedValue = (obj: any, key: string): any =>
  key.split(".").reduce((acc, part) => acc && acc[part], obj);

const BatikCode: React.FC<DynamicTableProps> = ({
  columns,
  data,
  websocket = true,
  linkBasePath,
  socket,
  port,
  linkCustomss,
}) => {
  const { realTimeData } = useHttp(socket, port);
  let websocketsss;

  if (websocket) websocketsss = realTimeData;
  else websocketsss = data;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Suspense fallback={<p className="text-center">Loading</p>}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {websocketsss?.map((row: any, rowIndex: number) => (
              <tr
                key={rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((column, colIndex) => {
                  return (
                    <td key={colIndex} className="px-6 py-4">
                      {column.isLink && linkBasePath ? (
                        <Link
                          href={`${linkBasePath}/${row[column.key]}`}
                          className="text-blue-500 hover:underline"
                        >
                          {linkCustomss}
                        </Link>
                      ) : column.objNested ? (
                        getNestedValue(row, column.key)
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
};

export default BatikCode;
