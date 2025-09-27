import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function Layout() {
    return (
        <>
            <Sidebar />
            <div className="flex flex-col">
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}