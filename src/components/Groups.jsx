import PropTypes from "prop-types";

Groups.propTypes = {
  setVisibleCreateGroup: PropTypes.func,
  allNotes: PropTypes.array,
  setChooseGroup: PropTypes.func,
  chooseGroup: PropTypes.string,
  setVisible: PropTypes.func,
  visible: PropTypes.bool,
};

export default function Groups({
  setVisibleCreateGroup,
  allNotes,
  setChooseGroup,
  chooseGroup,
  setVisible,
  visible,
}) {
  const handleClick = (selectGroupName) => {
    setChooseGroup(selectGroupName);
    setVisible((prev) => !prev);
  };

  return (
    <div
      className={`lg:w-1/3 md:w-1/3  flex flex-col ${
        visible ? "hidden" : "visible"
      } sm:block`}
    >
      <h1 className="text-3xl font-semibold mx-6 my-8">Pocket Notes</h1>
      <div className="mx-4">
        <button
          className="bg-black w-full text-white font-semibold text-lg rounded-3xl py-2 cursor-pointer"
          onClick={() => setVisibleCreateGroup((prev) => !prev)}
        >
          {" "}
          + Create Notes Group
        </button>
      </div>
      <div className="mt-8  ">
        {allNotes?.map((item, index) => (
          <div
            key={index}
            className={`ml-4 rounded-l-2xl bg-transparent p-2 mb-8 flex items-center cursor-pointer ${
              item.groupName === chooseGroup
                ? "lg:bg-pink-100 md:bg-pink-100"
                : ""
            }`}
            onClick={() => handleClick(item.groupName)}
          >
            <div
              className={`ml-4 text-3xl  ${item?.color} rounded-full w-14 h-14  flex items-center justify-center text-white flex-grow-0 flex-shrink-0`}
            >
              {item?.groupName?.substring(0, 2).toUpperCase()}
            </div>
            <div className=" lg:text-[20.67px] md:[15.67px] text-[18px]  font-semibold ml-4 flex items-center justify-center   ">
              {item?.groupName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
