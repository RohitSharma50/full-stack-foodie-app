import { useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import { useState } from "react";
import { total } from "./FoodItem";
import emptyCartImage from "../Images/empty-cart.jpg";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const handleOrderClick = () => {
    if (!cartItems.length) {
      alert("Please add Value to cart");
      return;
    }
    const existingOrder = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newValue = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      items: cartItems,
    };
    const updatedOrder = [...existingOrder, newValue];
    localStorage.setItem("cartItems", JSON.stringify(updatedOrder));

    setOrder([updatedOrder]);
    navigate("/order");
    // Redirect to order page
  };
  const total = toFixed(
    cartItems.reduce((sum, item) => {
      return (
        sum +
        (item.price * item.count
          ? item.price * item.count
          : item.defaultPrice * item.count) /
          100
      );
    }, 0)
  );

  return (
    <div className="flex flex-col justify-center my-10 sm:w-2/3   lg:w-1/3 mx-auto    shadow-zinc-400  shadow-lg p-4   ">
      {cartItems.length < 1 ? (
        <img src={emptyCartImage} alt="empty cart image" />
      ) : (
        <>
          {cartItems.map((item) => (
            <FoodItem key={item.id} {...item} />
          ))}
          <div className="font-extrabold ">
            <hr className=" shadow-black shadow" />
            <h3
              className="text-red-500  flex justify-end
                 shadow-black shadow-sm "
            >
              {" "}
              Total in INR - {total}
            </h3>
          </div>
          <button className="flex justify-end">
            <span
              className="bg-orange-500 rounded-lg p-1 m-2"
              onClick={handleOrderClick}
            >
              {" "}
              Order Now{" "}
            </span>
          </button>
          {order.length > 0 && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              Your order has been placed successfully!
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};
export default Cart;
