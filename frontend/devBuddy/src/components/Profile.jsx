import { useState } from "react";
import { useSelector } from "react-redux";
import { capitalizeText, objToLowerCase } from "../../utils/helpers";
import axios from "axios";
import * as Yup from "yup";
import Dropdown from "./Dropdown";
import { skillOptions } from "../../utils/helpers";
import Selected from "./Selected";
import { getChangedFields } from "../../utils/helpers";
const Profile = () => {
  const data = useSelector((store) => store?.user?.data);
  const caseSensitiveData = useSelector((store) => store?.user?.caseSensitiveData);

  const user = capitalizeText(data);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(caseSensitiveData?.email);
  const [age, setAge] = useState(user?.age || 0);
  const [about, setAbout] = useState(user?.about);
  const [picture, setPicture] = useState(caseSensitiveData?.photourl);
  const [skills, setSkills] = useState(caseSensitiveData?.skills);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [labels, setLabels] = useState([])
  const [hasChanges, setHasChanges] = useState(true)

  const currentUserData  = {...data, ...caseSensitiveData}

  const profileSchema = Yup.object({
    firstName: Yup.string()
      .min(3, { message: "Minimum length for first name is 3" })
      .max(50, { message: "Maximum length for first name is 50" })
      .lowercase("First name must be lowercase"),
    lastName: Yup.string()
      .min(3, { message: "Minimum length for last name is 3" })
      .max(50, { message: "Minimum length for first name is 3" })
      .lowercase("Last name must be lowercase"),
    age: Yup.number().min(12, { message: "Minimum length to register is 12" }),
    about: Yup.string().max(
      200,
      "Stop being self centered the max length for about section is 200"
    ),
    skills: Yup.array(Yup.object({id: Yup.number().min(1, {message: "Skill id can not be 0 or negative"}).required(), label: Yup.string().max(200, "No skills has length greater or equal to 200").required()})).max(10, {
      message:
        "Looks like your are highly skilled but you can only add 10 skills",
    }),
    picture: Yup.string().url(),
    // .matches(
    //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //     {message: 'Enter correct url!'}
    // )
  });
  const handleSkillSelect = (skill) => {
    const alreadySelected = skills.some((s) => s.id === skill.id);
    if (alreadySelected) return;
    setSkills([...skills, skill]);

  };
  const handleUpdateFile = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    const userInput = objToLowerCase({
      firstName: firstName,
      lastName: lastName,
      age: age,
      about: about,
      photourl: picture,
      skills: skills,
    });
    
     

     console.log(userInput)
    try {
      setError("");
      await profileSchema.validate(userInput);
      const changes  = getChangedFields(currentUserData, userInput)
      console.log("Sending patch request with body = " )
      console.log(changes)


      {
        if (Object.keys(changes).length === 0) {
         throw new Error("To update profile you need to change something");
        }
        const res = await axios({
            method: 'PATCH',
            url: 'http://localhost:6969/profile/edit',
            data: changes,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            timeout: 1000
        });
        console.log(res)
        setResponse(res)
      }
    } catch (err) {
      console.log(err)
      setError({
        ...(err?.response?.data ||
          err?.message ||
          "Something went wrong. Profile updation unsuccessful"),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleUpdateFile} className="max-w-xl mx-auto space-y-4">
        <div className="flex gap-4 w-full">
          <fieldset className="w-1/2">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Jim"
              value={firstName}
              onChange={(e) => {setFirstName(e.target.value)
                 setHasChanges(false)} }
              required
              disabled={isLoading}
            />
          </fieldset>

          <fieldset className="w-1/2">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Simons"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value)
                setHasChanges(false)}
              }
              required
              disabled={isLoading}
            />
          </fieldset>
        </div>

        <fieldset className="w-full">
          <legend className="fieldset-legend">Email</legend>
          <input
            disabled
            type="email"
            className="input input-bordered w-full"
            value={email}
            placeholder="email@email.com"
            required
          />
        </fieldset>

        <fieldset className="w-full">
          <legend className="fieldset-legend">About</legend>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            value={about}
            onChange={(e) => {setAbout(e.target.value)
              setHasChanges(false)}
            }
            required
            disabled={isLoading}
          />
        </fieldset>

        <fieldset className="w-full">
          <legend className="fieldset-legend">Age</legend>
          <input
            type="number"
            className="input input-bordered w-full"
            value={age}
            onChange={(e) => {setAge(e.target.value)
              setHasChanges(false)}
            }
            required
            disabled={isLoading}
          />
          <p className="label">Required</p>
        </fieldset>

        <fieldset className="w-full">
          <legend className="fieldset-legend">Skills</legend>

          <Selected titles={skills} state={setSkills} />
          <div>
            <Dropdown
              key={0}
              label={`Add Skills`}
              items={skillOptions}
              onSelect={handleSkillSelect}
            />
          </div>
        </fieldset>

        <fieldset className="w-full">
          <legend className="fieldset-legend">Picture</legend>
          <input
            type="url"
            className="input input-bordered w-full"
            value={picture}
            placeholder="https://www.google.com/"
            onChange={(e) => {setPicture(e.target.value)
              setIsLoading(true)}
            }
            required
            disabled={isLoading}
          />
        </fieldset>

        <div className="card-actions flex justify-center">
          <button
            type="submit"
            className="btn bg-primary btn-md w-1/3 rounded-md"
            disabled={isLoading || hasChanges}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Update profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
