import { useEffect, useState } from "react";
import Sellerbar from "./sellerbar";
function Sellercustomer() {
  const [details, setdetails] = useState([])
  useEffect(() => {
    fetchcustomer()
  }, [])

  const fetchcustomer = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/getcustomers', {
        credentials: "include"
      })
      const data = await res.json()

      if (!res.ok) {
        alert(data.msg)
        return
      } else {
        setdetails(data.customer)
        console.log(data)
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
              Customers
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full border text-sm">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Customer ID</th>
                    <th className="border p-2">Product ID</th>
                    <th className="border p-2">Customer Name</th>
                    <th className="border p-2">Address</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Delivery Status</th>
                  </tr>
                </thead>

                <tbody>
                  {details.length > 0 ? (
                    details.map((item) => (
                      <tr className="text-center" key={item._id}>
                        <td className="border p-2">{item.userId.slice(-4)}</td>
                        <td className="border p-2">{item.productId.slice(-4)}</td>
                        <td className="border p-2">{item.delivery.name}</td>
                        <td className="border p-2">{item.delivery.address}</td>
                        <td className="border p-2">{item.delivery.phone}</td>
                        <td className="border p-2"><span className={`px-2 py-1 rounded-lg border ${item.status === "paid"
                            ? "bg-green-100 border-green-300 text-green-700"
                            : "bg-red-100 border-red-300 text-red-700"
                          }`}>{item.status}</span></td>
                        <td className="border p-2">{item.deliverystatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sellercustomer;