
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">🎉 Order Placed Successfully!</h2>
      <Link to="/orders" className="text-blue-500 underline">
        View My Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
