import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Product() {
    const { id } = useParams()
    const [opencard, setopencard] = useState(false)
    const [prodetails, setProdetails] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [orderdeatils, setorderdetails] = useState({ name: "", phone: "", address: "" })
    const navigate = useNavigate()
    useEffect(() => {
        fetchproduct()
    }, [id])

    const fetchproduct = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/product/${id}`)
            const data = await res.json()
            console.log(data)
            setProdetails(data.product)
        } catch (err) {
            console.log(err)
        }
    }

    function increaseqty() {
        setQuantity(qty => qty + 1)
    }

    function decreaseqty() {
        setQuantity(qty => (qty > 1 ? qty - 1 : 1))
    }



    async function handleAddToCart(product, qty) {

        const res = await fetch("http://localhost:3001/api/addtocart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                productid: product._id,
                quantity: qty
            })
        })

        const data = await res.json()
        if (!res.ok) {
            alert(data.msg)
        } else {
            alert(data.msg)
        }
    }


    if (!prodetails) {
        return <div className="p-6">Loading...</div>
    }


    const handlebuynow = async (e) => {
        e.preventDefault()
        try {
            if (!orderdeatils.name || !orderdeatils.address || !orderdeatils.phone) {
                alert("fill all the required fields")
                return
            }
            console.log(orderdeatils)
            const getkey = await fetch('http://localhost:3001/api/getkey', {
                credentials: "include"
            })

            const keydata = await getkey.json()
            const res = await fetch('http://localhost:3001/api/createorder', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    productId: id,
                    quantity: quantity,
                    delivery: orderdeatils
                })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            }

            const options = {
                key: keydata.key,
                amount: data.amount,
                currency: "INR",

                name: "Suji Prasanth",
                description: "E-Commerce",

                order_id: data.orderId,
                prefill: {
                    name: orderdeatils.name,
                    contact: orderdeatils.phone
                },
                handler: async function (response) {
                    await verifypayment(response)
                },
                modal: {
                    ondismiss: async function () {

                        await fetch("http://localhost:3001/api/paymentfailed", {
                            method: "POST",
                            headers: { "Content-Type": "application/json", },
                            credentials: "include",
                            body: JSON.stringify({
                                razorpay_order_id: data.orderId
                            })
                        });
                    }
                }

            }

            const razor = new window.Razorpay(options)
            razor.open()
            setopencard(false)

        } catch (err) {
            console.log(err)
        }
    }


    const verifypayment = async (response) => {
        try {
            const res = await fetch('http://localhost:3001/api/verifypayment', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                })
            })

            const data = await res.json()

            if (data.success) {
                navigate("/paymentsuccess", {
                    state: {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id
                    }
                });
            } else {
                alert("Payment Failed");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="m-4 bg-white">
            <div className="grid md:grid-cols-6 gap-12">

                <div className="border rounded-xl lg:col-span-2 md:col-span-3 p-4">
                    <img src={`http://localhost:3001/${prodetails.productimage}`} alt={prodetails.productName} className="w-full md:h-[50vh] h-[30vh] object-contain" />

                    <div className="flex justify-center items-center gap-4 my-4">
                        <button onClick={decreaseqty} className="px-4 py-2 bg-gray-300 text-xl">-</button>
                        <span className="text-2xl font-bold">{quantity}</span>
                        <button onClick={increaseqty} className="px-4 py-2 bg-gray-300 text-xl">+</button>
                    </div>

                    <div className="text-xl text-center my-6">
                        <button className="bg-orange-400 hover:bg-orange-500 shadow p-2 px-6 m-2 rounded-lg" onClick={() => handleAddToCart(prodetails, quantity)} >
                            Add to cart
                        </button>

                        <button className="bg-yellow-300 hover:bg-yellow-500 shadow p-2 px-6 m-2 rounded-lg" onClick={() => setopencard(!opencard)} >
                            Buy Now
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 md:col-span-3 p-6">
                    <p className="text-5xl font-bold">{prodetails.productName}</p>
                    <p className="text-2xl text-gray-600 my-4">{prodetails.description}</p>
                    <p className="text-xl font-semi-bold line-through">₹{prodetails.price}</p>
                    <p className="text-3xl text-green-600 font-bold">₹{prodetails.finalprice}</p>
                    <p className="text-xl text-red-600 mt-2">
                        {prodetails.discount}% OFF
                    </p>
                </div>
            </div>
            {opencard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={() => setopencard(false)}  >
                    <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg" onClick={(e) => e.stopPropagation()}  >
                        <h2 className="text-xl font-semibold mb-4">Enter Details</h2>

                        <form className="space-y-4" onSubmit={handlebuynow}>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">Name</label>
                                <input type="text" required value={orderdeatils.name} onChange={(e) => setorderdetails({ ...orderdeatils, name: e.target.value })}
                                    placeholder="Enter your name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">Address</label>
                                <input type="text" required value={orderdeatils.address} onChange={(e) => setorderdetails({ ...orderdeatils, address: e.target.value })}
                                    placeholder="Enter your address" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">Phone</label>
                                <input type="tel" required value={orderdeatils.phone} onChange={(e) => setorderdetails({ ...orderdeatils, phone: e.target.value })}
                                    placeholder="Enter phone number" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setopencard(false)}
                                    className="px-4 py-2 rounded-md border hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product