import { useState } from "react";

const Selected  =( {titles, state}) => {
    
    return (
      <div className="flex flex-wrap w-full">
        {titles.map((skill, index) => (
            <div key= {skill.id} className=" flex basis-1/6 bg-gray-800 p-2 m-1 text-center rounded justify-between items-center">
              
              {skill.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-1 shrink-0 stroke-current align-right"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => {state((prevSkills) => prevSkills.filter(value => value.id !== skill.id))
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ))}
      </div>
    );

}
export default Selected;