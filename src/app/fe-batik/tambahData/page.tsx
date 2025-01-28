import BatikTitle from "@/app/components/batikUseAgain/HeaderCompoenents";
import PembungkusSidebar from "@/app/components/pembungkusSidebar";

const page = () => {
  return (
    <PembungkusSidebar>
      <div className="grid grid-cols-1 gap-4">
        <BatikTitle title="FORM Penambahan Batik" />
      </div>
    </PembungkusSidebar>
  );
};

export default page;
