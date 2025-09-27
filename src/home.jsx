import { useQuery } from "@tanstack/react-query";
import Chart from "./chart";
import { axiosInstance } from "./projects";
import { useContext, useEffect } from 'react'
import {Global} from './global-context'

export default function Home() {
    const { data } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosInstance.get("/table?select=*");
            return res.data
        },
    });
    function daysAgo(dateString) {
        if (!dateString) return "";
        const today = new Date();
        const past = new Date(dateString);
        const diffTime = today - past; // difference in ms
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert to days
        return diffDays === 0 ? "Today" : `${diffDays} days ago`;
    }

    const {dataForNav,setDataForNav} = useContext(Global)
    useEffect(()=>{
        setDataForNav(data)
    },[])
    return (
        <div className="flex flex-col w-[90vw] sm:w-[77vw]">
            <div className="flex h-[20%] sm:h-[20vh] gap-[1%] flex-wrap sm:flex-nowrap mt-2 mb-5">
                <div className="rounded bg-[#0e1117] w-[45%] sm:w-[25%] h-[47%] sm:h-[90%] flex items-center justify-between p-[2vw] text-black"  >
                    <div className="flex flex-col">
                        <h2 className="text-[1.5vw] h-[4vh] text-white">Total Orders</h2>
                        <h2 className="text-[1.5vw] h-[4vh] text-white">{data?.length || 0}</h2>
                    </div>
                    <div>
                        <h2 className="text-[1.5vw] text-white px-[1.5vh] py-[0.5vh] rounded bg-gray-700">
                            <div><i className="fa-solid fa-file"></i></div></h2>
                    </div>
                </div>
                <div className="rounded bg-[#0e1117] w-[45%] sm:w-[25%] h-[47%] sm:h-[90%] flex items-center justify-between p-[2vw] text-black">
                    <div className="flex flex-col">
                        <h2 className="text-[1.5vw] h-[4vh] text-white">Earnings</h2>
                        <h2 className="text-[1.5vw] h-[4vh] text-white">
                            {data?.map((item) => item.price).
                                reduce((acc, val) => { return acc + parseInt(val) }, 0) || 0}
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-[1.5vw] text-white px-[1.5vh] py-[0.5vh] rounded bg-gray-700">
                            <div><i className="fa-solid fa-dollar-sign"></i></div></h2>
                    </div>
                </div>
                <div className="rounded bg-[#0e1117] w-[45%] sm:w-[25%] h-[47%] sm:h-[90%] flex items-center justify-between p-[2vw] text-black">
                    <div className="flex flex-col">
                        <h2 className="text-[1.5vw] h-[4vh] text-white">Top Selling</h2>
                        <h2 className="text-[1.5vw] h-[4vh] text-white">
                            {data && data.length > 0
                                ? Object.entries(
                                    data.reduce((acc, item) => {
                                        acc[item.product] = (acc[item.product] || 0) + parseInt(item.price);
                                        return acc;
                                    }, {})
                                ).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
                                : "No Products"}
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-[1.5vw] text-white px-[1.5vh] py-[0.5vh] rounded bg-gray-700">
                            <div><i className="fa-solid fa-list-check"></i></div></h2>
                    </div>
                </div>
                <div className="rounded bg-[#0e1117] w-[45%] sm:w-[25%] h-[47%] sm:h-[90%] flex items-center justify-between p-[2vw] text-black">
                    <div className="flex flex-col">
                        <h2 className="text-[1.5vw] h-[4vh] text-white">Customers</h2>
                        <h2 className="text-[1.5vw] h-[4vh] text-white">
                            {data ? new Set(data.map(item => item.name.trim().toLowerCase())).size : 0}
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-[1.5vw] text-white px-[1.5vh] py-[0.5vh] rounded bg-gray-700">
                            <div><i className="fa-solid fa-users"></i></div></h2>
                    </div>
                </div>
            </div>
            
            <Chart data={data} />

            <div className="flex flex-col bg-[#0e1117] rounded p-3 w-[80vw] sm:w-[100%] mt-[10%] sm:mt-0 text-[1.5vw]">
                <h2 className="mb-4">Recent Activity</h2>
                <div className="flex justify-between w-[100%] border-b-1 p-2.5 border-white">
                    <h2>{data?.[data.length - 1]?.name}</h2>
                    <h2>{daysAgo(data?.[data.length - 1]?.date)}</h2>
                </div>
                <div className="flex justify-between w-[100%] border-b-1 p-2.5 border-white">
                    <h2>{data?.[data.length - 2]?.name}</h2>
                    <h2>{daysAgo(data?.[data.length - 2]?.date)}</h2>
                </div>
                <div className="flex justify-between w-[100%] border-b-1 p-2.5 border-white">
                    <h2>{data?.[data.length - 3]?.name}</h2>
                    <h2>{daysAgo(data?.[data.length - 3]?.date)}</h2>
                </div>
            </div>
        </div>
    )
}