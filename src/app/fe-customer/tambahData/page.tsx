import BatikTitle from "@/app/components/batikUseAgain/HeaderCompoenents";
import FormAdd from "@/app/components/formList/formAdd";
import PembungkusSidebar from "@/app/components/pembungkusSidebar";

export default function Page() {
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        <BatikTitle title="FORM Penambahan Customer" />
        <br />
        <div className="container  mx-auto max-w-screen-xl">
          <FormAdd batik={false} />
        </div>
      </div>
    </PembungkusSidebar>
  );
}
