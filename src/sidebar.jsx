import { Global } from "./global-context"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
export default function Sidebar() {
    const [toggleFlag,setToggleFlag] = useState(false)
    const { role, setRole } = useContext(Global)
    const data = localStorage.getItem("profileData")
    const Role = JSON.parse(data)
    return (
        <div>
            <div onClick={()=> setToggleFlag(!toggleFlag)} className={`${toggleFlag?"ml-[30%] p-2":"ml-0"} sm:hidden py-1 px-3`}>
                <i class="fa-solid fa-list-check text-[100%]"></i>
            </div>
            <div className={`${toggleFlag?"flex":"hidden"} sm:flex mr-[1vw] pt-[1vh] flex-col items-center gap-[2vh] w-[20vw] h-[100vh]`}>
                <div>
                    <h2 className="text-[2vw] hidden">{role || "Anonymus"}</h2>
                    <h2 className="text-[2vw] ">{Role?.role || "Anonymus"}</h2>
                </div>
                <div className="text-2xl border-[0.1vw] border-black flex justify-center items-center w-[7vw] h-[7vw] rounded-[50%]">
                    <i className="fa-solid fa-user text-[2vw]"></i>
                </div>

                <div className="flex flex-col gap-[0.5vh] text-[1.5vw]">
                    <div className="flex gap-[1vh] p-4">
                        <Link className="flex gap-[1vh]" to={"/"}><i className="fa-solid fa-house"></i> <p>Dashboard</p></Link>
                    </div>
                    <div className="p-4">
                        <Link className="flex gap-[1vh]" to={"/profile"}><i className="fa-solid fa-users"></i> <p>Profile</p></Link>
                    </div>
                    <div className="flex gap-[1vh] p-4">
                        <Link className="flex gap-[1vh]" to={"/projects"}><i className="fa-solid fa-file-invoice"></i> <p>Projects</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}