import { useState } from "react";
import Sellerbar from "./sellerbar";

function Addproduct() {


  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stockItem, setStockItem] = useState("");
  const [productAvailable, setProductAvailable] = useState(true);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!productImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stockItem", stockItem);
    formData.append("productAvailable", productAvailable);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    formData.append("productImage", productImage);

    const response = await fetch("https://single-vendor-e-commerce-platform.onrender.com/api/addproduct", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.ok) {
      alert("Product added successfully");

      setProductName("");
      setCategory("");
      setPrice("");
      setDiscount("");
      setStockItem("");
      setProductAvailable(true);
      setShortDescription("");
      setDescription("");
      setProductImage(null);

      document.querySelector('input[type="file"]').value = "";
    } else {
      const data = await response.json();
      alert(data.message || "Failed to add product");
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

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold">
                Add Product
              </h2>
              <p className="text-gray-500 text-sm">
                Create a new product
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" >

              <div>
                <label className="text-sm font-medium">Product Name</label>
                <input type="text" className="border rounded w-full p-2 mt-1" value={productName}
                  onChange={(e) => setProductName(e.target.value)} required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="border rounded w-full p-2 mt-1" value={category}
                  onChange={(e) => setCategory(e.target.value)} required
                >
                  <option value="">Select</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Travel">Travel</option>
                  <option value="Sports">Sports</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Gift">Gift</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Price</label>
                <input type="number" className="border rounded w-full p-2 mt-1" value={price}
                  onChange={(e) => setPrice(e.target.value)} required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Discount</label>
                <input type="number" className="border rounded w-full p-2 mt-1" value={discount} onChange={(e) => setDiscount(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium">Stock</label>
                <input type="number" className="border rounded w-full p-2 mt-1"
                  value={stockItem} onChange={(e) => setStockItem(e.target.value)} required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Available</label>
                <select className="border rounded w-full p-2 mt-1" value={productAvailable}
                  onChange={(e) =>
                    setProductAvailable(e.target.value === "true")
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">
                  Short Description
                </label>
                <input type="text" className="border rounded w-full p-2 mt-1" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">
                  Description
                </label>
                <textarea rows="3" className="border rounded w-full p-2 mt-1" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">
                  Product Image
                </label>

                {productImage && (
                  <img src={URL.createObjectURL(productImage)} className="h-20 mb-2 rounded" alt="" />
                )}

                <input type="file" className="border rounded w-full p-2"
                  onChange={(e) => setProductImage(e.target.files[0])} required
                />
              </div>

              <div className="sm:col-span-2">
                <button type="submit" className="w-full md:w-auto bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                  Add Product
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;