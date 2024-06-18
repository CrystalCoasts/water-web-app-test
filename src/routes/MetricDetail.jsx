import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import Chart from "react-apexcharts";
import "./MetricDetail.css";

const googleDriveCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRWgtxHG2hLyrOTSPxgKrMzhGlkcqdyLV8tQobZa8B4Pah4giCjY-Ek5euXmK5hvxf3vvPLZTHfzJG/pub?gid=156216978&single=true&output=csv";

const dataTestArduino =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2WvNSmE8sFCEviG3keE78vd0vCAJJp5bC7NrV8LHCpyKr_8rcax51IpHHbUClx6bjAEeAeNYnQkrk/pub?output=csv";

const MetricDetail = () => {
  const { metricName } = useParams();
  const [metricData, setMetricData] = useState(null);

  useEffect(() => {
    const fetchDetailedMetricData = async (metricName) => {
      Papa.parse(googleDriveCsvUrl, {
        download: true,
        header: true,
        complete: function (results) {
          const data = results.data;
          const metricValues = data.map((row) => parseFloat(row[metricName]));

          // Compute current, average, highest, and lowest values
          const avg = (
            metricValues.reduce((sum, val) => sum + val, 0) /
            metricValues.length
          ).toFixed(2);

          const highest = Math.max(...metricValues);

          const lowest = Math.min(...metricValues);

          const latestValue = metricValues[metricValues.length - 1];

          // Set the parsed data
          setMetricData({
            current: latestValue,
            average: avg,
            highest: highest,
            lowest: lowest,
            history: metricValues,
          });
        },
      });
    };

    fetchDetailedMetricData(metricName);
  }, [metricName]);

  if (!metricData) {
    return <div>Loading...</div>;
  }

  // chart
  const chartOptions = {
    chart: {
      id: "metric-chart",
    },
    xaxis: {
      categories: metricData.history.map((_, index) => index + 1),
    },
  };
  const chartSeries = [
    {
      name: metricName,
      data: metricData.history,
    },
  ];

  return (
    <div className="metric-detail">
      <div className="metric-summary">
        <div className="metric-value">{metricData.current}</div>
        <div className="metric-name">{metricName}</div>
      </div>

      {metricName === "pH" && (
        <div className="metric-status">
          <p>
            The current {metricName} is{" "}
            {metricData.current > 7
              ? "high"
              : metricData.current < 7
                ? "low"
                : "neutral"}
          </p>
        </div>
      )}

      <div className="metric-chart">
        <Chart options={chartOptions} series={chartSeries} type="line" />
      </div>

      <div className="metric-stats">
        <p>Average: {metricData.average}</p>
        <p>Highest: {metricData.highest}</p>
        <p>Lowest: {metricData.lowest}</p>
      </div>
    </div>
  );
};

export default MetricDetail;
