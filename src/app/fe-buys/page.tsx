import { cookies } from "next/headers";
import PembungkusSidebar from "../components/pembungkusSidebar";
import PembelianPageTabel from "../components/pembelianBatikTabel/TabelPembelian";
import Link from "next/link";

export async function getBatikPembelian(
  page: number,
  limit: number
): Promise<any> {
  const cookiesss = cookies();

  const res = await fetch(
    `http://localhost:3001/pembelian?page=${page}&limit=${limit}`,
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

export default async function Beli({ searchParams }) {
  const hasil = await getBatikPembelian(searchParams.page, searchParams.limit);
  console.log(hasil, `lers`);

  return <div></div>;
}
