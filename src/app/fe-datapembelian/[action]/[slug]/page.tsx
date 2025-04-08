import BatikTitle from "@/app/components/batikUseAgain/HeaderCompoenents";
import FormEditBon from "@/app/components/formList/formEditBon";
import PembungkusSidebar from "@/app/components/pembungkusSidebar";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
interface Bons {
  nomorBon: string;
  statusCode: number;
}

export async function getAllDataBeli(id: number): Promise<Bons> {
  const cookiesss = cookies();
  const res = await fetch(`http://localhost:3001/batiks/getbeliBAtik/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookiesss.get("jwt")?.value}`,
    },
    next: { tags: ["customer"] },
    credentials: "include",
  });
  return await res.json();
}

interface Paramss {
  params: {
    action: string;
    slug: string | number;
  };
}

export default async function ActionPembelian({ params }: Paramss) {
  const result = await getAllDataBeli(+params.slug);
  if (result.statusCode === 404) notFound();
  if (params.action !== "editBon") notFound();
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        <BatikTitle title="FORM Edit Bon" />
        <br />
        <div className="container mx-auto max-w-screen-xl">
          <FormEditBon bonData={result.nomorBon} />
        </div>
      </div>
    </PembungkusSidebar>
  );
}
