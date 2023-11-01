import { useEffect, useState } from "react";
import leftArrow from "../assets/leftArrow.svg";
import sendImg from "../assets/sendImg.svg";
import pocketNotes from "../assets/pocketNotes.svg";
import encrypt from "../assets/encrypt.svg";
import PropTypes from "prop-types";

Notes.propTypes = {
  allNotes: PropTypes.array,
  setAllNotes: PropTypes.func,
  chooseGroup: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default function Notes({
  allNotes,
  setAllNotes,
  chooseGroup,
  visible,
  setVisible,
}) {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const bgColor = allNotes.find((item) => {
    if (item.groupName === chooseGroup) return item;
  })?.color;

  useEffect(() => {
    const getTime = () => {
      const newTime = new Date();
      let hours = newTime.getHours();
      const minutes = newTime.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      if (hours > 12) hours -= 12;
      const finalTime = `${hours}:${minutes}${ampm}`;
      setTime(finalTime);
    };

    const getDate = () => {
      const currentTime = new Date();
      const currentDate = currentTime.getDate();
      const month = currentTime.toLocaleString("default", { month: "long" });
      const year = currentTime.getFullYear();

      const finalDate = `${currentDate}${month}${year}`;
      setDate(finalDate);
    };
    getTime();
    getDate();
  });

  if (chooseGroup == "") {
    return <PocketNotesPreview />;
  }

  const createNotes = () => {
    if (!note) {
      return;
    }
    const updateNotes = allNotes.map((item) => {
      if (item.groupName === chooseGroup) {
        return {
          ...item,
          notes: [
            ...item.notes,
            {
              time: time,
              date: date,
              note: note,
            },
          ],
        };
      }
      return item;
    });

    setAllNotes(updateNotes);
    setNote("");
    setDate("");
    setTime("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createNotes();
    }
  };

  return (
    <div
      className={`w-screen h-screen sm:block ${visible ? "visible" : "hidden"}`}
    >
      <div className="bg-gray-200 flex items-center py-2 ">
        <img
          src={leftArrow}
          alt="leftArrow"
          className="ml-2 cursor-pointer  lg:hidden md:hidden"
          onClick={() => setVisible((prev) => !prev)}
        />
        <span
          className={`text-3xl ${bgColor} w-14 h-14 max-h-20 max-w-20 rounded-full flex items-center justify-center mx-2  flex-shrink-0 text-white`}
        >
          {chooseGroup.substring(0, 2).toUpperCase()}
        </span>
        <span className="text-lg flex-shrink-0 font-semibold">
          {chooseGroup}
        </span>
      </div>

      <div className=" bg-pink-100  flex flex-col  w-full min-h-full  ">
        {allNotes.map(
          (item) =>
            item.groupName === chooseGroup &&
            item.notes.map((note, index) => (
              <div key={index} className="  flex  py-8   ">
                <div
                  className="flex flex-col  pl-2 lg:pl-10 
                 md:pl-6 text-sm md:text-lg lg:text-lg  lg:w-1/5"
                >
                  <p>{note.time}</p>

                  <p>{note?.date}</p>
                </div>
                <div className=" min-w-[200px] text-sm md:text-lg md:w-full lg:text-lg lg:w-full  px-2 lg:px-8 md:px-6">
                  <p>{note.note}</p>
                </div>
              </div>
            ))
        )}
      </div>

      <div className="bg-gray-100 p-6 relative h-1/3">
        <textarea
          placeholder="Enter Your Text here........"
          className="w-full h-full border-none outline-none
        rounded-lg resize-none p-2"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        ></textarea>
        <img
          src={sendImg}
          alt="send"
          className="absolute bottom-8 right-8 lg:bottom-10 md:bottom-10 cursor-pointer"
          onClick={(e) => createNotes(e)}
        />
      </div>
    </div>
  );
}

const PocketNotesPreview = () => {
  return (
    <div className="hidden lg:flex md:flex  bg-pink-100 w-screen min-h-screen   flex-col items-center justify-center relative  ">
      <img src={pocketNotes} alt="PocketNotesImg" />
      <h1 className="font-semibold text-4xl">Pocet Notes</h1>
      <p className="font-roboto mt-4">
        Send and receive messages without keeping your phone online. <br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>

      <div className="flex items-center absolute bottom-4 ">
        <img src={encrypt} alt="encrypt" className="mr-2" />
        <p>end-to-end encrypted</p>
      </div>
    </div>
  );
};
