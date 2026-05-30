import Cart from "../models/cartschema.js";


export const addtocart = async (req, res) => {
    try {

        if (req.user.role !== "User") {
            return res.status(403).json({ msg: "Only users can add to cart" });
        }
        const userid = req.user.id;
        const { productid, quantity } = req.body;

        let cart = await Cart.findOne({ userId: userid });

        if (!cart) {
            cart = await Cart.create({
                userId: userid,
                products: [{ productId: productid, quantity }]
            });

            return res.status(201).json({ msg: "Cart created & item added", cart });
        }

        const existingcart = cart.products.find(item => item.productId.toString() === productid.toString());

        if (existingcart) {
            existingcart.quantity += quantity;
        } else {
            cart.products.push({ productId: productid, quantity });
        }
        await cart.save();
        return res.status(200).json({ msg: "Cart updated", cart });

    } catch (err) {
        return res.status(500).json({ msg: "Server Error" });
    }
};


export const getcart = async (req, res) => {
    try {

        if (req.user.role !== "User") {
            return res.status(403).json({ msg: "Only users can add to cart" });
        }
        const userid = req.user.id;


        const cart = await Cart.findOne({ userId: userid }).populate("products.productId")
        if (!cart) {
            return res.status(404).json({ msg: "Cart is empty" });
        }

        let totalprice = 0

        const updateproducts = cart.products.map(item => {
            const productid = item.productId

            const subtotal = productid.finalprice * item.quantity
            totalprice += subtotal
            return { ...item._doc, subtotal }
        })

        return res.status(200).json({ msg: "Cart Fetched", cart: updateproducts, totalprice });

    } catch (err) {
        return res.status(500).json({ msg: "Server Error" });
    }
};


export const removecart = async (req, res) => {
    try {

        if (req.user.role !== "User") {
            return res.status(403).json({ msg: "Only users can add to cart" });
        }

        const userId = req.user.id
        const { productId } = req.params
        console.log(productId)
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ msg: "Cart Not Found" })
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== productId)
        await cart.save()
        return res.status(200).json({ msg: "Product Removed", cart })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}


export const updatequantity = async (req, res) => {
    try {

        if (req.user.role !== "User") {
            return res.status(403).json({ msg: "Only users can add to cart" });
        }

        const userId = req.user.id
        const { productId, type } = req.body

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ msg: "Cart not Found" })
        }

        const item = cart.products.find(item => item.productId.toString() === productId)

        if (!item) {
            return res.status(404).json({ msg: "Product not in cart" });
        }

        if (type === "inc") {
            item.quantity += 1
        } else if (type === "dec") {
            if (item.quantity > 1) {
                item.quantity -= 1
            }
        }

        await cart.save()

        const updatedproducts = await Cart.findOne({ userId }).populate("products.productId")
        return res.status(200).json({ msg: "Updated", cart: updatedproducts.products })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}