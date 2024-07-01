import React, { useEffect, useState } from "react";
import axios from "axios";

import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white", // Colore delle etichette della legenda
      },
    },
    title: {
      display: true,
      text: "Vendite dei Giochi",
      color: "white", // Colore del titolo
      font: {
        size: 24,
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white", // Colore delle etichette asse x
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // Colore della griglia asse x
      },
    },
    y: {
      ticks: {
        color: "white", // Colore delle etichette asse y
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // Colore della griglia asse y
      },
    },
  },
};

export function MyChart() {
  const [gameSales, setGameSales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/game-sales")
      .then((response) => {
        setGameSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching game sales:", error);
      });
  }, []);

  const labels = gameSales.map((game) => game.game.title);
  const data = {
    labels,
    datasets: [
      {
        label: "Vendite",
        data: gameSales.map((game) => game.total_sales),
        backgroundColor: "#e58e27", // Colore delle barre
      },
    ],
  };

  return (
    <div
      style={{
        background: "linear-gradient(34deg, rgba(37, 37, 40, 1) 12%, rgba(54, 45, 37, 1) 74%)",
        padding: "2%",
        borderRadius: "10px",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}
