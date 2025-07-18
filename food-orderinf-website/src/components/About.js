const About = () => {
  return (
    <div className="w-full h-auto mt-5 p-14 text-black mb-2 font-Poppins sm:p-4 ">
      <h1 className="font-bold text text-4xl">
        {" "}
        Some important information about project{" "}
      </h1>
      <br />
      <ul className="flex flex-col gap-6 text-base md:text-sm sm:gap-3 sm:text-xs">
        <li className="font-bold text-2xl md:text-lg sm:text-base">
          😎 Key Features
        </li>
        <li>📌 Used LightHouse for Performance Testing</li>
        <li>📌 check color contrast using WCAG Colour contrast</li>
        <li>📌 Used Redux for state management</li>
        <li>📌 Shimmer UI for Better UserExperience</li>
        <li>📌 Search Feature </li>
        <li>📌 Cart Feature</li>
        <li>📌 Checking network connection</li>
        <li>📌 forms to contact</li>
        <li>📌 Single page application</li>
        <li>📌 Implemented Lazy Loading or OnDemand Loading on This Router</li>
      </ul>
      <ul className="flex flex-col gap-6 text-base mt-10 md:text-sm sm:gap-3 sm:text-xs sm:mt-7">
        <li className="font-bold text-2xl md:text-lg sm:text-base">
          ⚙️ Tech Stack used
        </li>
        <li>➡️ Node JS for Backend</li>
        <li>➡️ Express JS for Server</li>
        <li>➡️ MongoDB for Database</li>
        <li>➡️ Mongoose for MongoDB Object Modeling</li>
        <li>➡️ Axios for API Calls</li>

        <li>➡️ Redux Toolkit for State Management</li>
        <li>➡️ React JS for UI </li>
        <li>➡️ Parcel for Bundling </li>
        <li>➡️ Tailwind CSS for Styling</li>
      </ul>
    </div>
  );
};
export default About;
