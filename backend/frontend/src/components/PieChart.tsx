import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

export type PieChartProps = {
  slices: {
    color: string;
    label: string;
    percentage: number;
  }[];
};

export const PieChart = ({ slices }: PieChartProps) => {
  return (
    <Doughnut
      data={{
        labels: slices.map(({ label }) => label),
        datasets: [
          {
            data: slices.map(({ percentage }) => percentage),
            backgroundColor: slices.map(({ color }) => color),
            borderColor: slices.map(({ color }) => color),
            borderWidth: 1,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            position: "right",
          },
        },
      }}
    />
  );
};
