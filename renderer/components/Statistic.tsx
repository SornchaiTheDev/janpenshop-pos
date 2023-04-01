import { convertToThousand } from "@/utils";

interface Props {
  title: string;
  value: number;
  unit: "piece" | "baht";
}
function Index({ title, value, unit }: Props) {
  const unitText = unit === "piece" ? "ชิ้น" : "บาท";

  return (
    <div className="w-full py-4 pl-2 pr-8 border rounded-md">
      <h5>{title}</h5>
      <h2 className="text-5xl font-bold">
        {convertToThousand(value)} <span className="text-base">{unitText}</span>
      </h2>
    </div>
  );
}

export default Index;
