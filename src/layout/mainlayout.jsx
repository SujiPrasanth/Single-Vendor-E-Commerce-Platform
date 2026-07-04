import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
function Mainlayout() {
    return (
        <>
        <div>
           <Navbar />
            <Outlet />
        </div>
        </>
    )
}
export default Mainlayout
