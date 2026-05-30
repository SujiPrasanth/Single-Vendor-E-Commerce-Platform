import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Category() {
    const [open, setOpen] = useState(false)
    const [displayproducts, setdisplayproducts] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        fetchproduct()
    }, [id])



    const fetchproduct = async () => {
        try {
            const res = await fetch(`https://single-vendor-e-commerce-platform.onrender.com/api/category/${id}`)
            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
            } else {
                setdisplayproducts(data.products)
            }

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    function sorthigh() {
        setdisplayproducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }

    function sortlow() {
        setdisplayproducts(prev => [...prev].sort((a, b) => a.price - b.price))
    }

    function sortdiscount() {
        setdisplayproducts(prev => [...prev].sort((a, b) => b.discount - a.discount))
    }

    if (loading) return <p>Loading...</p>

    if (displayproducts.length === 0) {
        return <p>No products found for "{id}"</p>
    }

    return (
        <div className='mx-2'>
            <h1 className='font-bold text-4xl p-3 text-center'>Category</h1>

            <div className='flex flex-col sm:flex-row gap-4 my-2 text-xl'>
                <p className='font-bold cursor-pointer' onClick={() => setOpen(!open)}>
                    Sort by:
                </p>

                <div className={`flex flex-col gap-4 sm:flex-row ${open ? "block" : "hidden"} sm:flex`}>
                    <p onClick={sortlow} className='cursor-pointer hover:underline'>Price -- Low to High</p>
                    <p onClick={sorthigh} className='cursor-pointer hover:underline'>Price -- High to Low</p>
                    <p onClick={sortdiscount} className='cursor-pointer hover:underline'>Discount</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-3 gap-3 my-4">
                {displayproducts.map((item) => (
                    <div key={item._id} className='hover:shadow-xl cursor-pointer shadow p-4' onClick={() => navigate(`/product/${item._id}`)} >
                        <img src={`https://single-vendor-e-commerce-platform.onrender.com/${item.productimage}`} alt="" className=''/>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='font-semibold text-xl mt-1'>{item.productName}</p>
                            <p className='text-xl line-through'>{item.price}</p>
                            <p className='text-xl font-semibold text-green-600'>{item.finalprice}</p>
                            <p className='font-semibold text-red-400 text-xl'>{item.discount}% OFF</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category