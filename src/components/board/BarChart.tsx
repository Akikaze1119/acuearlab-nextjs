'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TBoardData } from '@/lib/definitions';
import { Layout } from 'antd';

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BarChartProps {
  records: TBoardData[];
}

const BarChart = ({ records }: BarChartProps) => {
  // X - axis lable with
  const labels = records.map((record) => `Record${record.id}`);

  // Score Data
  const datasets = records.map(
    (record) => record.result.filter((item) => item.isCorrect === true).length
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Score',
        data: datasets,
        fill: false,
        borderColor: '#31C3DD',
        backgroundColor: '#31C3DD',
        tension: 0.1,
      },
    ],
  };

  // To make configuration
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Score',
        },
        display: true,
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        display: true,
      },
    },
  };

  return (
    <Layout>
      <Line data={data} options={options} />
    </Layout>
  );
};

export default BarChart;
