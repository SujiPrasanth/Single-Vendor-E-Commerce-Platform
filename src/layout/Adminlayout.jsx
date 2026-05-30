import { Outlet } from "react-router-dom"

function Adminlayout() {
    return (
        <>
        <div className="mt-2">
            <main>
                <Outlet />
            </main>
        </div>
        </>
    )
}

export default Adminlayout