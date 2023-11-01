import { useState } from "react";
import PropTypes from "prop-types";

CreateGroup.propTypes = {
  setVisibleCreateGroup: PropTypes.func,
  allNotes: PropTypes.array,
  setAllNotes: PropTypes.func,
};

export default function CreateGroup({
  setVisibleCreateGroup,
  allNotes,
  setAllNotes,
}) {
  const [inputGroupName, setInputGroupName] = useState("");
  const [inputColor, setInputColor] = useState("");

  const createNewGroup = () => {
    if (inputGroupName === "" && inputColor === "") {
      return;
    } else if (!inputGroupName || !inputColor) {
      return;
    }
    const updatedGroup = [
      ...allNotes,
      {
        groupName: inputGroupName,
        color: inputColor,
        notes: [],
      },
    ];
    setAllNotes(updatedGroup);
    setVisibleCreateGroup((prev) => !prev);
    setInputColor("");
    setInputGroupName("");
  };

  return (
    <div
      className=" w-screen h-screen flex items-center justify-center  fixed top-0 "
      style={{ background: "rgba(47, 47, 47, 0.75)" }}
    >
      <div className="h-60 w-[284px] lg:w-[740px] lg:h-[317px]  flex flex-col justify-between bg-white  p-4 rounded-lg ">
        <p className="text-lg font-bold lg:text-[29px]">
          Create New Notes group
        </p>
        <div className="flex items-center  ">
          <p className="font-bold text-sm mr-2 lg:text-[27px] lg:mr-8 ">
            Group&nbsp;Name
          </p>
          <input
            type="text"
            placeholder="Enter Your Group Name"
            className="  border-2 outline-nones rounded-full text-xs lg:text-lg md:text-lg p-1 px-2 w-40 placeholder:text-sm lg:w-[435px] lg:h-[51px]"
            value={inputGroupName}
            onChange={(e) => setInputGroupName(e.target.value)}
          />
        </div>
        <div className="flex items-center text-sm mt-2">
          <span className="text-md font-bold mr-2 lg:text-[27px] lg:mr-8">
            Choose&nbsp;colour
          </span>
          <span
            className="bg-violet-400 rounded-full w-11 h-5 mr-2 lg:w-10 lg:h-10 cursor-pointer"
            onClick={() => setInputColor("bg-violet-400")}
          ></span>
          <span
            className="bg-fuchsia-400 rounded-full w-11 h-5 mr-2 lg:h-[40px] lg:w-[40px] cursor-pointer"
            onClick={() => setInputColor("bg-fuchsia-400")}
          ></span>
          <span
            className="bg-cyan-300 rounded-full w-11 h-5 mr-2 lg:w-10 lg:h-10 cursor-pointer"
            onClick={() => setInputColor("bg-cyan-300")}
          ></span>
          <span
            className="bg-red-400 rounded-full w-11 h-5 mr-2 lg:w-10 lg:h-10 cursor-pointer"
            onClick={() => setInputColor("bg-red-400")}
          ></span>
          <span
            className="bg-blue-700 rounded-full w-11 h-5 mr-2 lg:w-10 lg:h-10 cursor-pointer"
            onClick={() => setInputColor("bg-blue-700")}
          ></span>
          <span
            className="bg-blue-400 rounded-full w-11 h-5 mr-2 lg:w-10 lg:h-10 cursor-pointer"
            onClick={() => setInputColor("bg-blue-400")}
          ></span>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="text-white bg-black rounded-lg w-60 h-10"
            onClick={(e) => createNewGroup(e)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
