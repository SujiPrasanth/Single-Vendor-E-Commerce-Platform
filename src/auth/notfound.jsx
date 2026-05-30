import { Link } from "react-router-dom"
function Notfound() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">

                    <h1 className="sm:text-5xl text-4xl font-bold p-2">Error page not found</h1>
                    <br />
                    <Link to={'/'} className="bg-red-600 text-2xl text-white font-semibold rounded-lg p-2">Go Back Home</Link>
                

            </div>

        </>
    )
}

export default Notfound