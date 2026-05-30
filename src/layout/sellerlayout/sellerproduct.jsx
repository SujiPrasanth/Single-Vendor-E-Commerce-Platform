import { useNavigate } from "react-router-dom";
import Sellerbar from "./sellerbar";
import { useEffect, useState } from "react";

function SellerProduct() {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [products, setproducts] = useState([]);
  const [selectedproduct, setselectedproduct] = useState(null);

  useEffect(() => {
    async function fetchproducts() {
      const res = await fetch(`https://single-vendor-e-commerce-platform.onrender.com/api/getproducts/`, {
        method: "GET",
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setproducts(data.getproducts);
      } else {
        alert("Failed to fetch Products");
      }
    }
    fetchproducts();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const res = await fetch(`https://single-vendor-e-commerce-platform.onrender.com/api/product/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Product deleted successfully");
      setproducts(prev => prev.filter(p => p._id !== id));
    } else {
      alert("Failed to delete product");
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
              My Products
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-[800px] w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Image</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Discount</th>
                    <th className="border p-2">Final</th>
                    <th className="border p-2">Stock</th>
                    <th className="border p-2">Desc</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="text-center">

                      <td className="border p-2">
                        <img src={`https://single-vendor-e-commerce-platform.onrender.com/${product.productimage}`} alt="" className="h-10 w-10 object-cover mx-auto rounded" />
                      </td>

                      <td className="border p-2">{product.productName}</td>
                      <td className="border p-2">{product.category}</td>
                      <td className="border p-2">₹{product.price}</td>
                      <td className="border p-2">{product.discount}%</td>
                      <td className="border p-2">₹{product.finalprice}</td>
                      <td className="border p-2">{product.stockItem}</td>

                      <td className="border p-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded text-xs" onClick={() => { setopen(true); setselectedproduct(product); }}  >
                          View
                        </button>
                      </td>

                      <td className="border p-2 space-x-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs" onClick={() => navigate(`/sellereditproduct/${product._id}`)} >
                          Edit
                        </button>

                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs"  >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {open && selectedproduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={() => setopen(false)}>
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-4 md:p-6 relative" onClick={(e) => e.stopPropagation()}  >

            <button onClick={() => setopen(false)} className="absolute top-2 right-3 text-xl" >
              ×
            </button>

            <div className="flex md:flex-row flex-col gap-4">

              <img src={`https://single-vendor-e-commerce-platform.onrender.com/${selectedproduct.productimage}`} className="w-1/3 object-cover rounded" alt="" />

              <div className="space-y-1 text-sm md:text-base">
                <p><b>Name:</b> {selectedproduct.productName}</p>
                <p><b>Category:</b> {selectedproduct.category}</p>
                <p><b>Price:</b> ₹{selectedproduct.price}</p>
                <p><b>Discount:</b> ₹{selectedproduct.discount}</p>
                <p><b>Final:</b> ₹{selectedproduct.finalprice}</p>
                <p><b>Stock:</b> {selectedproduct.stockItem}</p>
                <p><b>Description:</b> {selectedproduct.description}</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SellerProduct;