import type { ChartOptions } from "chart.js";

export const options: ChartOptions<"line"> = {
  responsive: true,
  borderColor: "yellow",
  scales: {
    y: {
      ticks: {
        display: false,
      },
      beginAtZero: true,
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};
