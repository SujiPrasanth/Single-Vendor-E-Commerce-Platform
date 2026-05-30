import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);
    const [opencard, setopencard] = useState(false)
    const [selecteditem, setselecteditem] = useState(null)
    const [orderdeatils, setorderdetails] = useState({ name: "", address: "", phone: "" })
    const navigate = useNavigate()
    useEffect(() => {
        fetchcart();
    }, []);

    const fetchcart = async () => {
        try {
            setloading(true);

            const res = await fetch("http://localhost:3001/api/getcart", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.msg || "Unauthorized");
                setloading(false);
                return;
            }
            console.log(data.cart)
            setproducts(data.cart);
            setloading(false);

        } catch (err) {
            console.log(err);
            setloading(false);
        }
    };

    async function handledelete(productId) {
        try {
            const res = await fetch(
                `http://localhost:3001/api/deleteproduct/${productId}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            const data = await res.json();

            if (res.ok) {
                setproducts(prev =>
                    prev.filter(item => item.productId._id !== productId)
                )
            }else{
                alert(data.msg)
                return
            }

        } catch (err) {
            console.log(err);
        }
    }

    const updatequantity = async (productId, type) => {
        try {
            const res = await fetch('http://localhost:3001/api/updatequantity', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    productId, type
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.msg);
            } else {
                setproducts(data.cart);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const totalPrice = products.reduce((acc, item) => {
        return acc + (item.productId.finalprice * item.quantity);
    }, 0);

    if (loading) return <h2 className="p-6">Loading...</h2>;

    if (products.length === 0) {
        return <h2 className="p-6">Cart is empty</h2>;
    }


    const handlebuynow = async (e) => {
        e.preventDefault()
        try {
            if (!orderdeatils.name || !orderdeatils.address || !orderdeatils.phone) {
                alert("fill all the required fields")
                return
            }
            console.log(selecteditem)
            const productId = selecteditem.productId._id;
            const quantity = selecteditem.quantity;
            console.log(productId)
            console.log(quantity)
            const getkey = await fetch('http://localhost:3001/api/getkey', {
                credentials: "include"
            })

            const keydata = await getkey.json()
            const res = await fetch('http://localhost:3001/api/createorder', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    productId: productId,
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
                    console.log("RAZORPAY RESPONSE:", response);
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
            console.log("VERIFY CALLED");

            const res = await fetch('http://localhost:3001/api/verifypayment', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                })
            });

            const data = await res.json();

            console.log("VERIFY RESPONSE:", data);

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
            console.log(err);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Your Cart
                </h1>

                <h2 className="text-xl md:text-2xl font-bold text-green-600">
                    Total: ₹{totalPrice}
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                {products.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4 border p-4 rounded-lg shadow"  >
                        <img src={`http://localhost:3001/${item.productId.productimage}`} alt={item.productId.productName} className="w-full sm:w-24 h-40 sm:h-24 object-contain border rounded" />

                        <div className="flex-1">
                            <h2 className="text-lg md:text-xl font-bold">
                                {item.productId.productName}
                            </h2>

                            <p className="text-gray-600 text-sm">
                                {item.productId.description}
                            </p>

                            <p className="text-blue-600 font-semibold line-through">
                                ₹{item.productId.price}
                            </p>

                            <p className="text-green-600 font-bold mt-1">
                                ₹{item.productId.finalprice}
                            </p>

                            <p className="text-red-600 font-bold mt-1">
                                {item.productId.discount}% off
                            </p>
                        </div>

                        <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3">

                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button onClick={() => updatequantity(item.productId._id, "dec")} className="px-3 py-1 bg-gray-200"   >
                                    -
                                </button>

                                <span className="px-4 font-bold">
                                    {item.quantity}
                                </span>

                                <button onClick={() => updatequantity(item.productId._id, "inc")} className="px-3 py-1 bg-gray-200"  >
                                    +
                                </button>
                            </div>

                            <button onClick={() => handledelete(item.productId._id)} className="px-3 py-1 bg-red-600 rounded text-white text-sm" >
                                Remove
                            </button>

                            <button className="px-3 py-1 bg-yellow-400 rounded text-white text-sm" onClick={() => {
                                setopencard(true)
                                setselecteditem(item)
                            }}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {opencard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={() => setopencard(false)} >
                    <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg" onClick={(e) => e.stopPropagation()} >
                        <h2 className="text-xl font-semibold mb-4">Enter Details</h2>

                        <form className="space-y-4" onSubmit={handlebuynow}>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">Name</label>
                                <input type="text" required value={orderdeatils.name} onChange={(e) => setorderdetails({ ...orderdeatils, name: e.target.value })} placeholder="Enter your name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
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

                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;