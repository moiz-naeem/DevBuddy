import { sendRequest } from "../../utils/helpers";

const UserCard = ({ user }) => {
  const { data, caseSensitiveData } = user || {};
  const { firstName, lastName, about, age } = data || {};
  const { skills = [], photourl } = caseSensitiveData || {};

  const handleButtonClick = async (action) => {
    try {
      await sendRequest(action, "mock_id_123");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="w-full m-5  aspect-[3/4] bg-black text-white rounded-lg overflow-hidden shadow-md flex flex-col transition-transform hover:scale-102 hover:shadow-lg">
      {/* Image section - responsive height */}
      <div className="flex-[2] w-full overflow-hidden">
        <img
          src={photourl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* Content section - responsive to remaining space */}
      <div className="flex-[1] p-2 sm:p-3 flex flex-col justify-between min-h-0">
        <div className="flex-grow">
          {/* Header with name and age */}
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <h2 className="text-xs sm:text-sm md:text-base font-semibold truncate pr-2">
              {firstName} {lastName}
            </h2>
            <span className="text-xs sm:text-sm text-gray-300 flex-shrink-0">
              {age}
            </span>
          </div>

          {/* About section */}
          <p className="text-[15px] sm:text-md text-gray-400 mb-2 line-clamp-2 leading-tight">
            {about}
          </p>

          {/* Skills section - responsive wrapping */}
          <div className="flex flex-wrap gap-1 mb-2">
            {skills.slice(0, 4).map((skill) => (
              <div
                key={skill._id}
                className="bg-gray-800 text-white px-1.5 py-1 rounded text-[20px] sm:text-[15px] md:text-l leading-tight"
              >
                {skill.label}
              </div>
            ))}
            {skills.length > 4 && (
              <span className="bg-gray-700 text-white px-1.5 py-1 rounded text-[20px] sm:text-[15px] md:text-l leading-tight">
                +{skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons - always at bottom */}
        <div className="flex w-[100%] justify-end gap-1 sm:gap-2 mt-auto pt-2">
          <button
            className="btn btn-success flex-1  text-[20px] sm:text-lg px-2 py-1 rounded transition-colors duration-200 flex-shrink-0 hover:scale-110"
            onClick={() => handleButtonClick("interested")}
          >
            Accept
          </button>
          <button
            className=" btn flex-1 btn-error hover:scale-110 text-white text-[20px] sm:text-md px-2 py-1 rounded transition-colors duration-200 flex-shrink-0 "
            onClick={() => handleButtonClick("ignored")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;