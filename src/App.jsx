import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Mainlayout from "./layout/mainlayout"

import Home from './layout/userlayout/Home'
import Category from './layout/userlayout/category'
import Product from './layout/userlayout/product'
import Login from './auth/login'
import Signup from './auth/signup'
import Sellerlogin from './auth/sellerlogin'
import Sellersignup from './auth/sellersignup'

import Sellereditproduct from './layout/sellerlayout/sellereditproduct'
import Sellerorder from './layout/sellerlayout/sellerorder'
import SellerProduct from './layout/sellerlayout/sellerproduct'
import Selleroverview from './layout/sellerlayout/selleroverview'
import Sellercustomer from './layout/sellerlayout/sellercustomer'
import Addproduct from './layout/sellerlayout/addproduct'
import Adminlayout from "./layout/Adminlayout"
import Cart from "./layout/userlayout/cart"
import PaymentSuccess from "./layout/userlayout/paymentsuccess"
import Orders from "./layout/userlayout/orders"

const router = createBrowserRouter([
    {
        element: <Mainlayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/home", element: <Home /> },
            { path: "category/:id", element: <Category /> },
            { path: "product/:id", element: <Product /> },
            { path: '/cart', element: <Cart /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "sellerlogin", element: <Sellerlogin /> },
            { path: "sellersignup", element: <Sellersignup /> },
            { path: '/paymentsuccess', element: <PaymentSuccess /> },
            { path: '/orders', element: <Orders /> }
        ]
    },
    {
        element: <Adminlayout />,
        children: [
            { path: "sellereditproduct/:id", element: <Sellereditproduct /> },
            { path: "selleroverview", element: <Selleroverview /> },
            { path: "sellerproduct", element: <SellerProduct /> },
            { path: "sellercustomer", element: <Sellercustomer /> },
            { path: "sellerorders", element: <Sellerorder /> },
            { path: "addproduct", element: <Addproduct /> }
        ]
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App