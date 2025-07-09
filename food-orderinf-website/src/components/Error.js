import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
const Error = () => {
  const err = useRouteError();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4 text-red-500 font-extrabold">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found 🍕
        </h1>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist. It might have been eaten or
          moved!
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5787/5787076.png"
          alt="Pizza"
          className="mx-auto w-24 h-24 mb-6"
        />
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};
export default Error;

{
  /* <h2 className="flex justify-center text-xl">{err.status + ":" + err.statusText}</h2> */
}
