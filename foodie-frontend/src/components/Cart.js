import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import emptyCartImage from "url:../Images/empty-cart.jpg";
import { ITEM_IMG_CDN_URL } from "../utils/Constant";
import { clearCart, decrementItemCount, incrementItemCount } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const currentUser = useSelector((store) => store.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOrderClick = () => {
    if (!cartItems.length) {
      toast.error("Add an item to your cart before ordering.");
      return;
    }

    if (!currentUser) {
      navigate("/auth", {
        state: { from: { pathname: "/cart" } },
      });
      return;
    }

    let existingOrder;
    try {
      existingOrder = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (!Array.isArray(existingOrder)) {
        throw new Error("Stored order history is invalid.");
      }
    } catch (error) {
      console.error("Unable to read saved orders:", error);
      toast.error("Could not load your order history. Please try again.");
      return;
    }

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

    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedOrder));
    } catch (error) {
      console.error("Unable to save order:", error);
      toast.error("Could not save your order. Please try again.");
      return;
    }

    dispatch(clearCart());
    navigate("/order", { replace: true });
  };
  const total = cartItems
    .reduce((sum, item) => {
      return sum + ((item.price ?? item.defaultPrice ?? 0) * item.count) / 100;
    }, 0)
    .toFixed(2);

  return (
    <main className="mx-auto my-10 flex w-full max-w-3xl flex-col justify-center p-4 shadow-lg shadow-zinc-400">
      <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <img src={emptyCartImage} alt="Your cart is empty" />
          <p>Your cart is empty. Browse restaurants and add something you love.</p>
          <button
            type="button"
            className="rounded-lg bg-orange-600 px-4 py-2 text-white"
            onClick={() => navigate("/")}
          >
            Browse restaurants
          </button>
        </div>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => {
              const price = item.price ?? item.defaultPrice ?? 0;
              return (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  {item.imageId && (
                    <img
                      src={`${ITEM_IMG_CDN_URL}${item.imageId}`}
                      alt={item.name}
                      className="h-20 w-20 rounded object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      ₹{(price / 100).toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded border px-2 py-1"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => dispatch(decrementItemCount(item.id))}
                    >
                      −
                    </button>
                    <span>{item.count}</span>
                    <button
                      type="button"
                      className="rounded border px-2 py-1"
                      aria-label={`Add one ${item.name}`}
                      onClick={() => dispatch(incrementItemCount(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <strong className="w-24 text-right">
                    ₹{((price * item.count) / 100).toFixed(2)}
                  </strong>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-end border-t pt-4 font-bold">
            Total: ₹{total}
          </div>
          <button
            type="button"
            className="mt-4 self-end rounded-lg bg-orange-500 px-4 py-2 text-white"
            onClick={handleOrderClick}
          >
            {currentUser ? "Place order" : "Sign in to order"}
          </button>
        </>
      )}
    </main>
  );
};
export default Cart;
