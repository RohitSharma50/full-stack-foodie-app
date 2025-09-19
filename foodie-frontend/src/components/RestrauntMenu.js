import { useParams } from "react-router-dom";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
  ITEM_IMG_CDN_URL,
} from "../utils/Constant";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import {
  addItem,
  incrementItemCount,
  decrementItemCount,
} from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const RestaurantMenu = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const { resId } = useParams();

  const [restaurant, menuItems] = useRestaurant(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );

  useEffect(() => {
    if (restaurant?.cloudinaryImageId) {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.href = `${IMG_CDN_URL}w_400,h_300,c_fill/${restaurant.cloudinaryImageId}`;
      preloadLink.type = "image/jpeg";
      document.head.appendChild(preloadLink);

      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [restaurant]);

  const addFoodItem = (item, action) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      if (action === "increment") {
        dispatch(incrementItemCount(item.id));
      } else if (action === "decrement") {
        dispatch(decrementItemCount(item.id));
      }
    } else {
      dispatch(addItem({ ...item, count: 1 }));
    }
  };

  if (!restaurant) return <Shimmer />;

  return (
    <section className="restaurant-menu mx-auto min-h-screen w-auto p-2">
      {/* Restaurant Summary */}
      <div className="restaurant-summary flex h-52 justify-center items-center overflow-y-hidden bg-slate-800 text-cyan-50">
        <img
          className="w-1/4 h-4/5  border-r-4 mt-4"
          fetchpriority="high"
          src={`${IMG_CDN_URL}w_400,h_300,c_fill/${restaurant?.cloudinaryImageId}`}
          alt={restaurant?.name}
        />
        <div className="flex flex-col m-5">
          <h2 className="text-2xl max-w-lg text-opacity-80">
            {restaurant?.name}
          </h2>
          <p className="opacity-90 text-base max-w-lg">
            {restaurant?.cuisines?.join(", ")}
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="restaurant-menu-content flex justify-center p-3">
        <div className="menu-items-container mt-2 max-w-3xl">
          <div className="menu-title-wrap p-5">
            <h3 className="text-zinc-600 text-xl font-semibold">Recommended</h3>
            <p className="mt-2 text-gray-600">{menuItems?.length} ITEMS</p>
          </div>

          <div className="menu-items-list flex flex-col gap-6">
            {menuItems.map((item) => {
              const cartItem = cartItems.find((ci) => ci.id === item.id);
              const price = item.price ?? item.defaultPrice ?? 0;

              return (
                <div className="menu-item border-b pb-6" key={item?.id}>
                  <div className="flex justify-between items-start">
                    {/* Left section */}
                    <div className="w-2/3">
                      <h3 className="text-lg font-semibold mb-1">
                        {item?.name}
                      </h3>
                      <p className="text-base text-gray-800 font-medium mb-1">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(price / 100)}
                      </p>
                      <p className="text-sm text-gray-800">
                        {item?.description}
                      </p>
                    </div>

                    {/* Right section */}
                    <div className="w-1/3 flex flex-col items-center ml-4">
                      {item?.imageId && (
                        <img
                          className="w-36 h-36 object-cover rounded-md mb-2 shadow"
                          src={ITEM_IMG_CDN_URL + item?.imageId}
                          alt={item?.name}
                          loading="lazy"
                        />
                      )}

                      {cartItem?.count > 0 ? (
                        <span className="flex items-center gap-2">
                          <button
                            className="text-black px-2 font-bold text-2xl"
                            onClick={() => addFoodItem(item, "decrement")}
                          >
                            -
                          </button>
                          {cartItem.count}
                          <button
                            className="text-black px-2 font-bold text-2xl"
                            onClick={() => addFoodItem(item, "increment")}
                          >
                            +
                          </button>
                        </span>
                      ) : (
                        <button
                          className="bg-orange-800 text-white px-4 py-1 rounded-lg"
                          onClick={() => addFoodItem(item)}
                        >
                          ADD+
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenu;
