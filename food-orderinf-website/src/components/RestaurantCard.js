import { IMG_CDN_URL } from "../utils/Constant";

const RestrauntCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRating,
  costForTwo,
}) => {
  return (
    <section className="w-64   m-4 p-3 rounded-lg  hover:scale-110 shadow-zinc-500 shadow-lg  flex-wrap justify-start">
      <img
        className="w-full h-auto rounded-lg align-middle"
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <h1 className="font-bold text-lg bg-clip-content truncate break-words ">
        {name}
      </h1>
      <p className="cuisines flex-wrap bg-clip-content truncate ">
        {/* {cuisines.join(", ")} */}
      </p>
      <span className="flex flex-wrap ">
        <div className="m-1 justify-center">
          {avgRating < 4.2 ? (
            <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-red-800 text-white font-medium rounded-md">
              ⭐{avgRating.toFixed(1)}
            </h4>
          ) : (
            <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-green-800 text-white font-medium rounded-md">
              ⭐{!!avgRating ? avgRating.toFixed(1) : "4.2"}
            </h4>
          )}
        </div>
        <h2 className="justify-center m-1">•</h2>
        <h4 className="heading text-sm justify-center text-black font-bold m-1.5">
          {" "}
          {costForTwo ?? "₹200 for two"}
        </h4>
      </span>
    </section>
  );
};
export default RestrauntCard;
