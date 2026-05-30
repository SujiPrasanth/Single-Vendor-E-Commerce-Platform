import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    const { orderId, paymentId } = location.state || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">

                <div className="text-green-600 text-5xl mb-4">
                    ✓
                </div>

                <h1 className="text-2xl font-bold mb-2">
                    Payment Successful
                </h1>

                <p className="text-gray-600 mb-4">
                    Your order has been placed successfully.
                </p>

                <div className="bg-gray-100 rounded-lg p-4 text-left space-y-2">
                    <p>
                        <span className="font-semibold">Order ID:</span> {orderId}
                    </p>
                    <p>
                        <span className="font-semibold">Payment ID:</span> {paymentId}
                    </p>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                    Redirecting to home in 5 seconds...
                </p>

                <button onClick={() => navigate("/")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" >
                    Go Home Now
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;