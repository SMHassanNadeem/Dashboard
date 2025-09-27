import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
);

export default function Chart({ data }) {
    const data1 = {
        labels: data?.map((item) => item.date) || [],
        datasets: [
            {
                label: "Earning",
                data: data?.map((item) => item.price).reduce((acc, val) => {
                    const last = acc.length > 0 ? acc[acc.length - 1] : 0;
                    acc.push(parseInt(last) + parseInt(val));
                    return acc;
                }, []) || [],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "rgb(75, 192, 192)",
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const data2 = {
        labels: data?.map((item) => item.product) || [],
        datasets: [
            {
                label: "Users by Country",
                data: data?.map((item) => item.price) || [],
                backgroundColor: [
                    "rgba(76, 120, 168, 0.6)",   // muted steel blue
                    "rgba(229, 87, 86, 0.6)",    // soft red
                    "rgba(114, 183, 178, 0.6)",  // teal green
                    "rgba(84, 162, 75, 0.6)",    // muted green
                    "rgba(238, 202, 59, 0.6)",   // warm muted yellow
                    "rgba(178, 121, 162, 0.6)",  // dusty purple
                    "rgba(157, 117, 93, 0.6)",   // earthy brown
                    "rgba(186, 176, 172, 0.6)",  // soft grey
                    "rgba(255, 157, 166, 0.6)",  // gentle pink
                    "rgba(92, 99, 112, 0.6)"     // slate grey
                ]
                ,
                borderColor: [
                    "gray",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options1 = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            tooltip: {
                callbacks: {
                    label: function (ctx) {
                        let label = ctx.label || "";
                        let value = ctx.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };
    return (
        <div className="flex flex-wrap sm:flex-nowrap w-[90vw] sm:w-[77vw] h-[100%] sm:h-[45vh] sm:mb-[3vh]">
            <div className="h-[50%] sm:h-[100%] w-[90%] sm:w-[49vw] rounded bg-[#0e1117]">
                <Line data={data1} options={options} />
            </div>
            <div className="flex justify-center w-[90%] mt-[10px] sm:mt-0 sm:w-[35%] h-[50%] sm:h-[100%] rounded bg-[#0e1117]">
                <Pie data={data2} options={options1} />
            </div>
        </div>
    )
}
