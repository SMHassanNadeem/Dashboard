import {createContext, useState} from "react";
export const Global = createContext()
export function GlobalProvider({children}){
    const [notif,setNotif] = useState(0);
    const [dataForNav,setDataForNav] = useState([])
    const [role,setRole] = useState("Anonymus")
    return(
        <Global.Provider value={{notif,setNotif, dataForNav, setDataForNav, role,setRole }}>
            {children}
        </Global.Provider>
    )
}