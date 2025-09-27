import { useContext, useState } from 'react'
import { Global } from './global-context'
import { Link } from 'react-router-dom'
export default function Navbar() {
    const { notif, setNotif } = useContext(Global)
    const [notifToggle, setNotifToggle] = useState(false)
    const {dataForNav,setDataForNav} = useContext(Global)
    function daysAgo(dateString) {
        if (!dateString) return "";
        const today = new Date();
        const past = new Date(dateString);
        const diffTime = today - past; // difference in ms
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert to days
        return diffDays === 0 ? "Today" : `${diffDays} days ago`;
    }
    return (
        <div className='flex flex-col w-[90vw] sm:w-[77vw]'>
            <div className="flex items-center justify-between border-b-1 border-black p-2 text-[1.5vw]">
                <h2 className="">Dashboard</h2>
                <div className="flex gap-5">
                    {/* <div><i className="fa-regular fa-moon"></i></div> */}
                    <div onClick={() => { setNotif(0); setNotifToggle(!notifToggle) }}><i className="fa-regular fa-bell"></i>{notif ? <b className="text-[1vw] bg-red-900 py-0 px-1 rounded-[50%]">{notif}</b> : null}</div>
                    <Link to={"/profile"}><div><i className="fa-solid fa-user"></i></div></Link>
                </div>
            </div>
            <div className='flex justify-end'>
                {notifToggle ? <div className='absolute rounded w-70 bg-black'>
                    <div className="flex flex-col bg-[#0e1117] border-1 border-white rounded p-3 w-[70vw] sm:w-[100%] mt-[10%] sm:mt-0 text-[1.5vw]">
                        <h2 className="mb-4">Notification</h2>
                        <div className="flex justify-between w-[100%] border-b-1 p-2.5 border-white">
                            <h2>{dataForNav?.[dataForNav.length - 1]?.name}</h2>
                            <h2>{daysAgo(dataForNav?.[dataForNav.length - 1]?.date)}</h2>
                        </div>
                        <div className="flex justify-between w-[100%] border-b-1 p-2.5 border-white">
                            <h2>{dataForNav?.[dataForNav.length - 2]?.name}</h2>
                            <h2>{daysAgo(dataForNav?.[dataForNav.length - 2]?.date)}</h2>
                        </div>
                        <div className="flex justify-between w-[100%] border-b-1 p-2.5 border-white">
                            <h2>{dataForNav?.[dataForNav.length - 3]?.name}</h2>
                            <h2>{daysAgo(dataForNav?.[dataForNav.length - 3]?.date)}</h2>
                        </div>
                    </div>
                </div> : null}
            </div>
        </div>
    )
}