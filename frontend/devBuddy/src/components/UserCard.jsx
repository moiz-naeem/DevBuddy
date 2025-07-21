const UserCard = ({firstName, lastName, about, age, photourl, skills}) => {
  return (
    <div className="card bg-black w-96 shadow-sm">
      <figure>
        <img
          src={photourl}
          alt={firstName + " 's profile picture"}
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-grow gap-5">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <h3>{age}</h3>
        </div>
        <p>
           {about}
        </p>
        <div className="flex flex-wrap w-full">
        {skills?.map((skill, index) => (
            <div key= {skill.id} className=" flex basis-1/6 bg-gray-800 p-2 m-1 text-center rounded justify-between items-center">
              {skill.label}             
            </div>
          ))}
      </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
