'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TWeakDataWithWords } from '@/lib/definitions';
import { Layout } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BarChartProps {
  weakRecords: TWeakDataWithWords[];
}

const BarChart = ({ weakRecords }: BarChartProps) => {
  const labels = weakRecords.map(
    (record: TWeakDataWithWords) => `${record.word1} - ${record.word2}`
  );
  const datasets = weakRecords.map((record: TWeakDataWithWords) => record.times_incorrect);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Weak words',
        data: datasets,
        borderColor: '#31C3DD',
        backgroundColor: '#31C3DD',
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // To make the chart responsive
    scales: {
      y: {
        title: {
          display: true,
          text: 'Times Incorrect',
        },
        display: true,
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: 'Weak Words',
        },
        display: true,
      },
    },
  };
  return (
    <Layout>
      <article className='min-h-96'>
        <Bar data={data} options={options} />
      </article>
    </Layout>
  );
};

export default BarChart;
