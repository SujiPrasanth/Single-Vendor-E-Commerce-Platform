import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mobile from "../../assets/phone.png";
import sports from "../../assets/baseball.png";
import travel from "../../assets/motorcycle.png"
import shoes from "../../assets/running.png"
import laptop from "../../assets/laptop.png"
import gift from "../../assets/gift.png"

function Home() {
    const [products, setproducts] = useState([])
    const categoryimages = {
        Mobile: mobile,
        Sports: sports,
        Travel: travel,
        Shoes: shoes,
        Laptop: laptop,
        Gift: gift
    }

    useEffect(() => {
        async function fetchproducts() {
            try {
                const res = await fetch("http://localhost:3001/api/getallproducts")

                if (!res.ok) {
                    throw new Error("Failed to fetch products")
                }

                const data = await res.json()
                setproducts(data.products)
            } catch (error) {
                console.error("API Error:", error)
            }
        }

        fetchproducts()
    }, [])

    const category = Object.keys(
        products.reduce((acc, item) => {acc[item.category] = true
            return acc
        }, {})
    ).map((cate) => ({name: cate,img: categoryimages[cate] || mobile}))

    const orderbyprice = [...products].sort((a, b) => a.price - b.price).slice(0, 7)

    const groupbycategory = products.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
    }, {})


    const orderbydiscount = Object.entries(groupbycategory).map(
        ([category, products]) => ({
            category: category,
            products: products.sort((a, b) => b.discount - a.discount).slice(0, 2)
        })
    );
    console.log(orderbydiscount)


    const navigate = useNavigate()
    if (!products || products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">Loading products...</h1>
            </div>
        );
    }



    return (
        <>

            <div className="bg-gray-100 min-h-screen overflow-y-auto scrollbar-hide">
                <div className="m-2 mt-3 bg-white p-2">
                    <h1 className="text-xl font-semibold p-2 text-center">
                        Products By Category
                    </h1>

                    <div className="grid lg:grid-cols-6 gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 p-4">
                        {category.map((item) => (
                            <div key={item.name} className="flex flex-col items-center hover:-translate-y-1 transition duration-300"
                                onClick={() => navigate(`/category/${item.name}`)}
                            >
                                <img src={item.img} alt={item.name} className="h-12 w-12 object-cover cursor-pointer "
                                />
                                <h1 className="text-xl font-semibold text-center cursor-pointer">
                                    {item.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="mx-2 my-4 bg-white p-4"> 
                    <h1 className="text-xl font-semibold mb-4 text-center">
                        Offers by Price
                    </h1>

                    <div className="grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4">
                        {orderbyprice.map((item) => (
                            <div key={item._id} className="border rounded-lg p-2 flex flex-col items-center cursor-pointer hover:shadow-lg" onClick={() => { navigate(`/product/${item._id}`) }}>
                                <img src={`http://localhost:3001/${item.productimage}`} alt={item.productName} className="h-24 w-24 object-cover"
                                />
                                <p className="font-semibold text-center mt-2">
                                    {item.productName}
                                </p>
                                <p className="font-semi-bold line-through ">
                                    ₹{item.price}
                                </p>
                                <p className="text-green-600 font-bold">
                                    ₹{item.finalprice}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="mx-2 my-2 bg-white p-3">
                    <h1 className="text-xl p-2 font-semibold  text-center">
                        Top Discount Deals
                    </h1>
                    <p className="text-center mb-4">By Discount</p>

                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                        {orderbydiscount.map((cat) => (
                            <div key={cat.category} className="mb-6 border shadow shadow-xl p-3 " >
                                <h2 className="text-xl font-bold mb-2">{cat.category.toUpperCase()}</h2>

                                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                                    {cat.products.map((item) => (
                                        <div key={item._id} className="border  rounded-lg p-2 flex flex-col items-center cursor-pointer hover:shadow-lg"
                                            onClick={() => { navigate(`/product/${item._id}`) }}>
                                            <img src={`http://localhost:3001/${item.productimage}`} alt={item.price} className="h-24 w-24 object-cover" />

                                            <p className="font-semibold text-center mt-2">{item.productName}</p>
                                            <p className="text-red-500 font-bold mt-1">{item.discount}% OFF</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;

