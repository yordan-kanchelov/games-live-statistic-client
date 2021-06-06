/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "chart.js/auto";

const ctx = document.getElementById("playersActiveChart");

(async () => {
    const data: { gin: number; players: { pid: string }[] }[] = await fetch(
        "https://games-live-statistic.herokuapp.com/api/game-statistic"
    ).then((res) => res.json());

    const activeGins = data.map((value) => `GIN ${value.gin}`);
    const activePlayers = data.map((value) => value.players.length);

    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: activeGins,
            datasets: [
                {
                    label: "Active players",
                    data: activePlayers,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
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

    setInterval(async () => {
        const newData: { gin: number; players: { pid: string }[] }[] = await fetch(
            "https://games-live-statistic.herokuapp.com/api/game-statistic"
        ).then((res) => res.json());

        const newActiveGins = newData.map((value) => `GIN ${value.gin}`);
        const newActivePlayers = newData.map((value) => value.players.length);

        console.log(newActiveGins);
        console.log(newActivePlayers);
        console.log(myChart);

        myChart.data.labels = newActiveGins;

        myChart.data.datasets.forEach((dataset: any) => {
            dataset.data.pop();
        });

        myChart.data.datasets.forEach((dataset: any) => {
            dataset.data.push(newActivePlayers.pop());
        });

        myChart.update();
    }, 10000);

    console.log(myChart);
    console.log(data);
})();
