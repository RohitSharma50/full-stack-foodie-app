import react, { useState } from "react";
import { IMG_CDN_URL } from "../utils/Constant";

const OrderList = () => {
  const orderItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [visibleOrder, setVisibleOrder] = useState(null);

  const toggleOrder = (index) => {
    setVisibleOrder((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orderItems.map((order, index) => {
        const totalPrice = (order.items || []).reduce(
          (acc, item) =>
            acc +
            ((item.price ? item.price : item.defaultPrice) *
              (item.count ?? 1)) /
              100,
          0
        );

        return (
          <div
            key={order.id || index}
            onClick={() => toggleOrder(index)}
            className="bg-white border rounded-lg shadow mb-4 cursor-pointer hover:shadow-md transition"
          >
            {/* Summary card */}
            <div className="flex items-center gap-4 p-4">
              <img
                src={IMG_CDN_URL + order.items[0].imageId}
                alt={order.items[0].name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg">
                  {" "}
                  {order.items?.length || 0} items ordered
                </p>
                <p className="text-sm text-gray-700">
                  Delivered on {order.date || "N/A"}
                </p>
              </div>{" "}
              <div className="text-right">
                <p className="text-green-800 font-semibold">{totalPrice}₹</p>
                <p className="text-sm text-blue-800">
                  {visibleOrder === index ? "▲ Hide" : "▼ Show"}
                </p>
              </div>
            </div>

            {/* Expanded items list */}
            {visibleOrder === index && (
              <div className="border-t p-4 bg-gray-50 grid grid-cols-3 gap-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <img
                      src={IMG_CDN_URL + item.imageId}
                      alt={item.name}
                      title={item.name}
                      className="w-24 h-24 object-cover rounded"
                      loading="lazy"
                    />

                    <p className="text-start  truncate break-words w-24 ">
                      {item.name}
                    </p>
                    <p>Meal {item.count} </p>
                    <p>{item.price ? item.price / 100 : 100} ₹</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
