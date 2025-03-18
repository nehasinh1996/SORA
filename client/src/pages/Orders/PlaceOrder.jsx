
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Confirm Your Order</h2>
      <button
        onClick={() => navigate("/order-success")}
        className="bg-black text-white px-6 py-2 rounded-lg"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default PlaceOrder;
