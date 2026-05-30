import { useEffect, useState } from "react";
import Sellerbar from "./sellerbar";

function Selleroverview() {

  const [details, setdetails] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await fetch('https://single-vendor-e-commerce-platform.onrender.com/api/overview', {
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
      } else {
        setdetails(data);
        console.log(data)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="grid min-h-screen bg-gray-200 grid-cols-1 md:grid-cols-10 my-2">

      <Sellerbar />

      <div className="col-span-10 md:col-span-8 p-3 sm:p-4">

        <div className="space-y-6">

          <div>
            <p className="text-lg sm:text-xl font-semibold">Welcome Back Suji</p>
            <p className="text-gray-600 text-sm">
              Here is your store overview
            </p>
          </div>


          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                ₹{details.totalrevenue}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Revenue (This Year)</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-400">
                ₹{details.totalrevenueyear[0]?.total || 0}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Revenue (This Month)</p>
              <p className="text-xl sm:text-2xl font-bold text-violet-500">
                ₹{details.totalrevenuemonth[0]?.total || 0}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-xl sm:text-2xl font-bold">
                {details.totalproducts}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Paid Orders</p>
              <p className="text-xl sm:text-2xl font-bold">
                {details.totalorders}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Failed Orders</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                {details.totalfailedorders}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Highest Product Stock</p>
              <p className="font-semibold text-green-600">
                {details.higheststock?.productName || 0}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {details.higheststock?.stockItem || 0}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <p className="text-gray-500 text-sm">Lowest Product Stock</p>
              <p className="font-semibold text-red-600">
                {details.loweststock?.productName || 0}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                {details.loweststock?.stockItem || 0}
              </p>
            </div>

          </div>

          <div className="bg-white border rounded-lg p-4 shadow overflow-x-auto">
            <h2 className="text-lg font-semibold mb-3">Recent Orders</h2>

            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="bg-gray-100 text-xs sm:text-sm">
                  <th className="p-2 text-left">Order ID</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {details.recentorders.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-2 truncate max-w-[120px]">
                      {item._id}
                    </td>
                    <td className="p-2">₹{item.totalamount}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-white text-xs ${item.status === "paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {details.recentbuyers && (
            <div className="bg-white border rounded-lg p-4 shadow overflow-x-auto">
              <h2 className="text-lg font-semibold mb-3">Recent Customers</h2>

              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-gray-100 text-xs sm:text-sm">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {details.recentbuyers.map((item, index) => (
                    <tr key={index} className="border-t">

                      <td className="p-2">
                        {item.delivery?.name}
                      </td>

                      <td className="p-2">
                        {item.userId?.useremail}
                      </td>

                      <td className="p-2">
                        {item.delivery?.phone}
                      </td>


                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white text-xs ${item.status === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                          }`}>
                          {item.status}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Selleroverview;