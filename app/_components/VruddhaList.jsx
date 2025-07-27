import VruddhaCard from "./VruddhaCard";
import { getVruddhas } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function VruddhaList() {
  noStore();
  const data = await getVruddhas();

  if (!data.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((vruddha) => (
        <VruddhaCard key={vruddha.id} vruddha={vruddha} />
      ))}
    </div>
  );
}

export default VruddhaList;
