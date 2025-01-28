import { BatikItem, getBatikAll } from "@/app/fe-batik/page";
import { CustomerInterface, getCustomerALl } from "@/app/fe-customer/page";

export default async function FormOrderComponent() {
  const hasil: CustomerInterface[] = (await getCustomerALl()) || [];
  const batik: BatikItem[] = (await getBatikAll()) || [];
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label htmlFor="customerId" className="block text-gray-700 mt-2 mb-3">
          Nama Customer
        </label>
        <select
          name="customerId"
          id="customerId"
          required
          className="w-full border border-l-rose-200 rounded-md p-2 focus:outline-none focus:ring focus:ring-slate-400"
        >
          <option value="">-- Pilih salah satu --</option>
          {hasil.map((data) => (
            <option key={data.id} value={data.id}>
              {data.namaCustomer}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="batikId" className="block text-gray-700 mt-2 mb-3">
          Jenis Batik
        </label>
        <select
          name="batikId"
          id="batikId"
          required
          className="w-full border border-l-rose-200 rounded-md p-2 focus:outline-none focus:ring focus:ring-slate-400"
        >
          <option value="">-- Pilih salah satu --</option>
          {batik.map((data) => (
            <option key={data.id} value={data.id}>
              {data.typeBatik}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
