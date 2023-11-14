import { Flex, Text, AbsoluteCenter } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
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
          cutout: questionNum ? "65%" : "50%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 11,
              }
            },
            tooltip: {
             yAlign: "bottom",
             padding: 10,
             callbacks: {
              label(tooltipItems) {
                return ` ${tooltipItems.formattedValue} %`;
              },
             }
            }
          },
        }}
      />
      {questionNum && (
          <AbsoluteCenter top="40%" w="50px" textAlign="center" letterSpacing="tighter">
            <Text fontWeight="bold" fontSize={["lg", "lg", "2xl", "2xl"]}>{questionNum}</Text>
            <Text fontSize="xs">questions</Text>
          </AbsoluteCenter>
      )}
    </Flex>
  );
};
