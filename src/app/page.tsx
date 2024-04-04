"use client";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function Home() {
  const [chartData, setChartData] = useState([]);

  const getData = async () => {
    // X- Axis
    const res = await fetch("https://retoolapi.dev/gDa8uC/data");
    const xData = await res.json();

    const xArr = xData?.slice(0, 50);

    const res2 = await fetch("https://retoolapi.dev/o5zMs5/data");
    const YData = await res2.json();

    const YArr = YData?.slice(0, 50);
    setChartData(
      YArr.map((y, i) => [
        parseInt(xArr[i].RandomNumber),
        parseInt(y.RandomNumber),
      ])
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="min-h-screen  p-24">
      <div className="text-center">
        <h2 className="text-xl font-bold">Spearmint Technologies Assignment</h2>
      </div>
      {chartData?.length > 0 && (
        <ReactApexChart
          type="scatter"
          series={[{ name: "Sample", data: chartData }]}
          options={{
            chart: {
              height: 1000,
              width: 1000,
              type: "scatter",
              zoom: {
                enabled: true,
                type: "xy",
              },
            },
            xaxis: {
              tickAmount: 10,
              labels: {
                formatter: function (val) {
                  return parseFloat(val).toFixed(1);
                },
              },
            },
            yaxis: {
              tickAmount: 7,
            },
          }}
          height={700}
        />
      )}
    </main>
  );
}
