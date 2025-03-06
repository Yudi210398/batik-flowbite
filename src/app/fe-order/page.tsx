import BatikTitle from "../components/batikUseAgain/HeaderCompoenents";
import FormOrder from "../components/formComponent/FormOrder";
import PembungkusSidebar from "../components/pembungkusSidebar";

export default async function Order() {
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        <BatikTitle title="FORM Penambahan Order" />
        <br />
        <div className="container  mx-auto max-w-screen-xl">
          <FormOrder />
        </div>
      </div>
    </PembungkusSidebar>
  );
}
