import BatikTitle from "@/app/components/batikUseAgain/HeaderCompoenents";
import FormAdd from "@/app/components/formList/formAdd";
import PembungkusSidebar from "@/app/components/pembungkusSidebar";

const page = () => {
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        <BatikTitle title="FORM Penambahan Batik" />
        <br />
        <div className="container  mx-auto max-w-screen-xl">
          <FormAdd />
        </div>
      </div>
    </PembungkusSidebar>
  );
};

export default page;
