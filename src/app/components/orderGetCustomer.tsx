import { CustomerInterface, getCustomerALl } from "../fe-customer/page";

export default async function GetOrderCustomer() {
  const hasil: CustomerInterface[] = (await getCustomerALl()) || [];
  return (
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
  );
}
