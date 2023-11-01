import CreateGroup from "./CreateGroup";
import Groups from "./Groups";
import Notes from "./Notes";
import { useEffect, useState } from "react";

export default function Root() {
  const [allNotes, setAllNotes] = useState(
    JSON.parse(window.localStorage.getItem("notesApp")) || []
  );
  const [visibleCreateGroup, setVisibleCreateGroup] = useState(false);
  const [chooseGroup, setChooseGroup] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("notesApp", JSON.stringify(allNotes));
  }, [allNotes]);
  return (
    <>
      <div className="  lg:flex md:flex  ">
        <Groups
          setVisibleCreateGroup={setVisibleCreateGroup}
          allNotes={allNotes}
          setChooseGroup={setChooseGroup}
          chooseGroup={chooseGroup}
          setVisible={setVisible}
          visible={visible}
        />

        <Notes
          allNotes={allNotes}
          setAllNotes={setAllNotes}
          chooseGroup={chooseGroup}
          setVisible={setVisible}
          visible={visible}
        />
      </div>
      {visibleCreateGroup && (
        <CreateGroup
          setVisibleCreateGroup={setVisibleCreateGroup}
          allNotes={allNotes}
          setAllNotes={setAllNotes}
        />
      )}
    </>
  );
}
