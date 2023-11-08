import { Flex, AbsoluteCenter, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

export type PieChartProps = {
  questionNum?: number;
  slices: {
    color: string;
    label: string;
    percentage: number;
  }[];
};

export const PieChart = ({ questionNum, slices }: PieChartProps) => {
  return (
    <Flex position="relative">
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
          cutout: "65%",
          plugins: {
            legend: {
              position: "right",
            },
          },
        }}
      />
      {questionNum && (
        <AbsoluteCenter w="50px" textAlign="center" letterSpacing="tighter">
          <Text fontSize="2xl" fontWeight="bold">{questionNum}</Text>
          <Text fontSize="xs">questions</Text>
        </AbsoluteCenter>
      )}
    </Flex>
  );
};
