import BatikCode from "@/app/components/batikUseAgain/BatikCode";
import PembungkusSidebar from "@/app/components/pembungkusSidebar";
import { cookies } from "next/headers";
import { convertTime } from "../page";

export interface GetId {
  params: {
    slug: string | number;
  };
}

const columns = [
  { title: "NAma Customer", key: "customer.namaCustomer", objNested: true },
  { title: " quantity", key: "quantity" },
  { title: "waktu bikin", key: "waktuBikin" },
  { title: "nomor Bon", key: "nomorBon" },
];

export async function getBatikAll(id: string | number): Promise<BatikDetail[]> {
  const cookiesss = cookies();
  const res = await fetch(`http://localhost:3001/batiks/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookiesss.get("jwt")?.value}`,
    },
    next: { tags: ["customer"] },
    credentials: "include",
  });

  const data = await res.json();
  return data.map((item: BatikDetail) => {
    return {
      ...item,
      waktuBikin: convertTime(item.batik.waktuBikin),
    };
  });
}

export default async function PageSlug({ params }: GetId) {
  const hasil = await getBatikAll(+params.slug);
  let htmlCheck =
    hasil.length === 0 ? (
      <h6 className="text-center font-serif text-3xl">
        DATA PEMBELIAN BATIK TIDAK ADA
      </h6>
    ) : (
      <h6 className="text-center font-serif text-3xl">
        DATA BATIK {hasil[0].batik.typeBatik.toUpperCase()}{" "}
        {hasil[0]?.batik?.jenisBatik.toUpperCase()}
      </h6>
    );
  console.log(hasil, `wkwkw`, htmlCheck);
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        <div className="justify-self-center">
          {htmlCheck}

          <hr />
        </div>

        {/* <!-- ... -->
  <!-- ... --> 
  <!-- ... -->
  <!-- ... --> */}
      </div>
      <br />
      <br />
      {hasil.length > 0 && (
        <BatikCode columns={columns} websocket={false} data={hasil} />
      )}
    </PembungkusSidebar>
  );
}
