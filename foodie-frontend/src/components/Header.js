import { useState } from "react";
import logo from "../Images/foodie.webp";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../utils/userSlice";

const Title = () => {
  return (
    <a href="/">
      <img
        fetchpriority="high"
        src={logo}
        alt="Foodie app logo"
        height="112"
        width="112" // Adjusted for better performance
        className="h-28 w-auto p-0"
      />
    </a>
  );
};

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());

    sessionStorage.clear();

    navigate("/");
  };
  return (
    <nav className="flex justify-between bg-white shadow-lg ">
      <Title />
      <section>
        <ul className="flex py-1  text-2xl items-center ">
          {!!currentUser && (
            <li className="px-2 hover:shadow-lg">
              <Link to="/cart">
                🛒{cartItems.length ? cartItems.length : " "}
              </Link>
            </li>
          )}
          <li className="px-0 hover:shadow-lg rounded-md">
            {" "}
            {!!currentUser ? (
              <div className="relative">
                <button onClick={() => setOpen(!open)} className="p-2">
                  <span className="mr-0 w-8 h-8">
                    {currentUser.name ? currentUser.name : "User"}
                  </span>
                </button>

                {open && (
                  <ul className="absolute right-0 mt-2 bg-white shadow-md rounded w-40">
                    <Link to="/about" onClick={() => setOpen(false)}>
                      <li className="p-2 hover:bg-gray-100">About Us</li>
                    </Link>
                    <Link to="/order" onClick={() => setOpen(false)}>
                      {" "}
                      <li className="p-2 hover:bg-gray-100">Order</li>
                    </Link>
                    <li
                      className="p-2 hover:bg-gray-100"
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <button>Login</button>
              </Link>
            )}
          </li>
        </ul>
      </section>
    </nav>
  );
};
export default Header;
