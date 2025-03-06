import PembungkusSidebar from "@/app/components/pembungkusSidebar";
import { GetId } from "@/app/fe-batik/[slug]/page";
import { cookies } from "next/headers";
import { CustomerInterface } from "../page";
import BatikCode from "@/app/components/batikUseAgain/BatikCode";

export async function getCustomerAll(
  id: string | number
): Promise<CustomerInterface[]> {
  const cookiesss = cookies();
  const res = await fetch(`http://localhost:3001/customer/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookiesss.get("jwt")?.value}`,
    },
    next: { tags: ["customer"] },
    credentials: "include",
  });

  return await res.json();
}

const columns = [
  { title: "Pembelian Batik", key: "batik.typeBatik", objNested: true },
  { title: "quantity", key: "quantity" },
  { title: "waktu bikin", key: "waktuBikin" },
  { title: "nomor Bon", key: "nomorBon" },
];

export default async function PageSlugCustomer({ params }: GetId) {
  const hasil = await getCustomerAll(+params.slug);
  let htmlCheck =
    hasil.length === 0 ? (
      <h6 className="text-center font-serif text-3xl">
        DATA PEMBELIAN BATIK TIDAK ADA
      </h6>
    ) : (
      <h6 className="text-center font-serif text-3xl">
        DATA PEMBELIAN {hasil[0]?.customer.namaCustomer.toUpperCase()}
      </h6>
    );
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        {/* <!-- ... --> */}
        <div className="justify-self-center">
          {htmlCheck}

          <hr />
        </div>

        {/* <!-- ... -->
<!-- ... --> 
<!-- ... -->
<!-- ... --> */}

        {hasil.length > 0 && (
          <BatikCode columns={columns} data={hasil} websocket={false} />
        )}
      </div>
    </PembungkusSidebar>
  );
}
