import { useMemo } from "react";
import { convertToThousand } from "@/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { options } from "./chartOptions";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

interface Props {
  title: string;
  value: number;
  unit: "piece" | "baht";
}
function Index({ title, value, unit }: Props) {
  const unitText = unit === "piece" ? "ชิ้น" : "บาท";

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "##0ea5e9",
        backgroundColor: "#bae6fd",
      },
    ],
  };

  return (
    <div className="flex items-center w-full px-2 py-4 rounded-md shadow bg-sky-100">
      <div className="flex-1">
        <h5 className="text-sky-700">{title}</h5>
        <h2 className="text-5xl font-bold text-sky-800">
          {convertToThousand(value)}{" "}
          <span className="text-base">{unitText}</span>
        </h2>
      </div>

      <div className="w-[120px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Index;
