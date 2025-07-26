import { reviewRequest } from "../../utils/helpers";

const UserCard = ({ request }) => {
  const{_id} = request
  const { firstName, lastName, about, photourl, skills} = request.sendBy || {};
  const {age} =  request.sendBy || 0;
   //backend should be sending age but it is not available need to make sure
  // const { skills = [], photourl } = caseSensitiveData || {};

  const handleButtonClick = async (action) => {
    try {
      await reviewRequest(action, _id);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] bg-black text-white rounded-lg overflow-hidden shadow-md flex flex-col transition-transform hover:scale-102 hover:shadow-lg">
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden flex-shrink-0">
        <img
          src={photourl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>


      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-h-[180px]">
        <div className="flex-grow space-y-2 sm:space-y-3">

          <div className="flex justify-between items-center">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold truncate pr-2">
              {firstName} {lastName}
            </h2>
            <span className="text-sm sm:text-base text-gray-300 flex-shrink-0">
              {age}
            </span>
          </div>


          <p className="text-xs sm:text-sm md:text-base text-gray-400 line-clamp-2 leading-relaxed">
            {about}
          </p>


          <div className="flex flex-wrap gap-1 sm:gap-2">
            {skills.slice(0, 4).map((skill) => (
              <div
                key={skill._id}
                className="bg-gray-800 text-white px-2 py-1 rounded text-xs sm:text-sm md:text-base leading-tight"
              >
                {skill.label}
              </div>
            ))}
            {skills.length > 4 && (
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs sm:text-sm md:text-base leading-tight">
                +{skills.length - 4}
              </span>
            )}
          </div>
        </div>


        <div className="flex w-full justify-end gap-2 mt-4 pt-2 border-t border-gray-700">
          <button
            className="btn btn-success flex-1 text-xs sm:text-sm md:text-base px-3 py-2 rounded transition-all duration-200 hover:scale-105 min-h-[36px] sm:min-h-[40px]"
            onClick={() => handleButtonClick("accepted")}
          >
            Accept
          </button>
          <button
            className="btn flex-1 btn-error hover:scale-105 text-white text-xs sm:text-sm md:text-base px-3 py-2 rounded transition-all duration-200 min-h-[36px] sm:min-h-[40px]"
            onClick={() => handleButtonClick("rejected")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;