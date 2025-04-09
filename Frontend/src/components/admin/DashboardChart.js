import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, LineElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the components that you need
Chart.register(ArcElement, LineElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardChart = ({ products, adminOrders, users, outOfStock }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    new Chart(ctx, {
      type: 'bar', // You can also use 'doughnut', 'pie', 'line', etc.
      data: {
        labels: ['Products', 'Orders', 'Users', 'Out of Stock'],
        datasets: [
          {
            label: 'Count',
            data: [products.length, adminOrders.length, users.length, outOfStock],
            backgroundColor: ['#7fa08a', 'pink', '#7fa08a', 'pink'],
            borderColor: ['#7fa08a', 'pink', '#7fa08a', 'pink'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [products, adminOrders, users, outOfStock]);

  return <canvas ref={chartRef}></canvas>;
};

export default DashboardChart;
