import Sellerbar from "./sellerbar";
import { useEffect, useState } from "react";

function Sellerorder() {
  const [orders, setorders] = useState([])

  useEffect(() => {
    fetchorders()
  }, [])

  const fetchorders = async () => {
    try {
      const res = await fetch('https://single-vendor-e-commerce-platform.onrender.com/api/getorders', {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.msg)
        return
      } else {
        console.log(data.order)
        setorders(data.order)
        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updatestatus = async (id, deliverystatus) => {
    try {
      console.log(id),
        console.log(deliverystatus)
      const res = await fetch(`https://single-vendor-e-commerce-platform.onrender.com/api/updatedeliverystatus/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ deliverystatus })
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.msg)
        return
      } else {
        setorders((prev) => prev.map((order) =>
          order._id === data.order._id ? data.order : order));
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="grid grid-cols-1 md:grid-cols-10">

        <div className="md:col-span-2">
          <Sellerbar />
        </div>
        <div className="md:col-span-8 p-3 md:p-6">

          <div className="bg-white rounded-lg shadow p-4 md:p-6">

            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Orders
            </h2>

            <div className="overflow-x-auto">

              <table className="min-w-[700px] w-full border text-sm">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Order ID</th>
                    <th className="border p-2">Product ID</th>
                    <th className="border p-2">Product</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Delivery Status</th>

                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="text-center">

                      <td className="border p-2">{order.razorpay_order_id}</td>
                      <td className="border p-2">{order.productId._id}</td>
                      <td className="border p-2">{order.userId.useremail}</td>
                      <td className="border p-2">{order.productId.productName}</td>
                      <td className="border p-2">₹{order.totalamount}</td>
                      <td className="border p-2"><span className={`px-2 py-1 rounded-lg border ${order.status === "paid"
                        ? "bg-green-100 border-green-300 text-green-700"
                        : "bg-red-100 border-red-300 text-red-700"
                        }`}>{order.status}</span></td>
                      <td className="border p-2">

                        <select
                          value={order.deliverystatus}
                          onChange={(e) =>
                            updatestatus(order._id, e.target.value)
                          }
                          disabled={order.status === "failed"}
                          className={`border  rounded px-2 py-1 text-xs md:text-sm ${order.status === "failed" ? 'bg-gray-100 cursor-not-allowed' : ""}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="placed">Placed</option>
                          <option value="shipped">Shipped</option>
                          <option value="outfordelivery">Out For Delivery</option>
                          <option value="delivered">Delivered</option>
                        </select>

                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Sellerorder;