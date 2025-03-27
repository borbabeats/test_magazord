import ListMain from "@/components/list_main";
import Sidebar from "@/components/sidebar";

export default async function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex  gap-4">
        <Sidebar />
        <ListMain />
      </div>
    </div>
  );
}
