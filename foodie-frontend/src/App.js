/*
 *
 *   Things the bundler (like Parcel) does:
 *   - Creates a server
 *   - Hot Module Reloading (HMR)
 *   - File Watching via C++
 *   - Builds and minifies code
 *   - Cleans unused code (tree shaking)
 *   - Handles dev and prod builds
 *   - Optimizes images
 *   - Adds compression and caching
 *   - Uses consistent hashing for caching
 *   - Supports HTTPS and port management
 *   - Zero-config setup
 */

import React, { Suspense, lazy, Profiler } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import OrderList from "./components/OrderList";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import { Auth } from "./authentication/Auth";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./utils/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = lazy(() => import("./components/About"));
const Footer = lazy(() => import("./components/Footer"));

const RestaurantMenu = lazy(() => import("./components/RestrauntMenu"));

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {}

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Profiler id="header" onRender={onRender}>
        <Header />
      </Profiler>
      <Profiler id="outlet" onRender={onRender}>
        <Outlet />
      </Profiler>
      <Profiler id="footer" onRender={onRender}>
        <Suspense>
          <Footer />
        </Suspense>
      </Profiler>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Body className="flex flex-wrap m-2 p-1 max-w-screen-2xl justify-center" />
        ),
      },
      {
        path: "/About",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/home",
        element: <Body />,
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/order",
        element: <OrderList />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RouterProvider
    future={{
      v7_startTransition: true,
    }}
    router={appRouter}
  />
);
