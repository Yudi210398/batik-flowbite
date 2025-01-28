import { cookies } from "next/headers";
import PembungkusSidebar from "../components/pembungkusSidebar";
import FormOrderComponent from "../components/orderComponents/orderGetForm";

export default async function Page() {
  const cookiesss = cookies();

  return (
    <PembungkusSidebar>
      <div className="flex justify-center py-10">
        <h1
          style={{ display: "inline-block", borderBottom: "2px solid black" }}
          className="text-center text-xl"
        >
          FORM ORDER
        </h1>
      </div>

      <div className="flex justify-center py-1">
        <form className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-md">
          <FormOrderComponent />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="quantity"
                className="block text-gray-700 mt-2 mb-3"
              >
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                id="quantity"
                placeholder="1"
                required
                min="1"
                className="w-full border border-l-rose-200 rounded-md p-2 focus:outline-none focus:ring focus:ring-slate-400"
              />
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </PembungkusSidebar>
  );
}
