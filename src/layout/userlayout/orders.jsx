import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/getuserorders", {
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.msg);
            } else {
                console.log(data)
                setOrders(data.orders);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="p-6">Loading orders...</p>;

    if (orders.length === 0) {
        return <p className="p-6">No orders found</p>;
    }

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">

            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                My Orders
            </h1>

            <div className="flex flex-col gap-4">

                {orders.map((order) => (
                    <div key={order._id} className="bg-white border rounded-xl shadow p-4 flex flex-col md:flex-row gap-4">

                        <img src={`http://localhost:3001/${order.productId?.productimage}`} alt={order.productId?.productName} className="w-full md:w-32 h-40 md:h-32 object-contain border rounded" />

                        <div className="flex-1 space-y-2">

                            <h2 className="text-lg md:text-xl font-bold">
                                {order.productId?.productName}
                            </h2>

                            <p className="text-gray-600 text-sm">
                                {order.productId?.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm">

                                <p>
                                    Qty: <span className="font-semibold">{order.quantity}</span>
                                </p>

                                <p>
                                    Price: ₹
                                    <span className="line-through">{order.price}</span>
                                </p>
                                <p className="text-red-600 font-bold">
                                    Discount: {order.productId.discount}%
                                </p>
                                <p className="text-green-600 font-bold">
                                    Total: ₹{order.totalamount}
                                </p>

                            </div>
                            <p className="text-xs text-gray-500 break-all">
                                Payment ID: {order.razorpay_payment_id || "N/A"}
                            </p>

                            <p className="text-xs text-gray-400">
                                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                            </p>

                        </div>


                        <div className="flex flex-col justify-center gap-3 min-w-[160px]">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-600">
                                    Payment
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}>
                                    {order.status}
                                </span>

                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-600">
                                    Delivery
                                </span>

                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.deliverystatus === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.deliverystatus === "shipped"
                                        ? "bg-blue-100 text-blue-700" : order.deliverystatus === "Processing" 
                                        ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {order.deliverystatus}
                                </span>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default Orders;