import React, { useRef } from "react";
import { useState } from "react";

import { GrCheckbox } from "react-icons/gr";
import { IoIosCheckbox } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function Userinput() {
  const [task, setTask] = useState({
    id: "",
    content: "",
    isCompleted: false,
  });

  const todosKey = "todokey";

  const [list, setList] = useState(() => {
    const rawData = localStorage.getItem(todosKey);
    if (!rawData) return [];

    return JSON.parse(rawData);
  });
  const inputRef = useRef(null);

  const taskStore = () => {
    const newId = Date.now();
    const { id, content, isCompleted } = task;
    if (task.content.trim() == "") {
      inputRef.current.focus();
      inputRef.current.classList.add("placeholder-red-600");
      return;
    } else {
      setList([...list, { id: newId, content, isCompleted }]);
      setTask({ id: newId, content: "", isCompleted: false });
      inputRef.current.classList.remove("placeholder-red-600");
    }
    console.log(id, content, isCompleted);
  };

  const delbtn = (deleteIndex) => {
    const newList = list.filter((elem, index) => index !== deleteIndex);
    setList(newList);
  };

  const editBtn = (editIndex) => {
    setTask(list[editIndex]);
    const newList = list.filter((elem, index) => index !== editIndex);
    setList(newList);
  };

  const toggleComp = (toggleIndex) => {
    const updateList = list.map((item, index) =>
      toggleIndex === index
        ? { ...item, isCompleted: !item.isCompleted }
        : item,
    );

    setList(updateList);
  };

  // local storage......
  localStorage.setItem(todosKey, JSON.stringify(list));

  return (
    <>
      <div
        className="section1 h-[30vh] w-full
        flex flex-col p-10 
        sm:flex sm:flex-row md:flex md:flex-row lg:flex lg:flex-row  font-serif
         justify-center items-center gap-3"
      >
        <input
          onChange={(event) =>
            setTask({ ...task, content: event.target.value })
          }
          ref={inputRef}
          className=" h-[10vh] w-[70vw]  bg-[#d3d6d9dd] 
          text-2xl sm:h-[11vh] sm:w-[70vw] md:h-[13vh]
           md:w-[47vw] 
           lg:h-[11vh] lg:w-[50vw]
        rounded-l-lg p-4 outline-none border-none"
          type="text"
          value={task.content}
          placeholder="Enter task..."
        />

        {/* Add btn */}
        <button
          onClick={taskStore}
          className="h-16 w-28 bg-blue-600 sm:h-16 sm:w-[20vw] flex justify-center items-center
          md:w-[15vw] lg:w-[13vw] gap-2
          text-2xl text-amber-50 rounded-[3rem]
          active:scale-95 cursor-pointer hover:bg-blue-900"
        >
          Add <IoMdAddCircle />
        </button>
      </div>

      {/* Task screen */}
      <div
        className="h-screen w-[80vw] flex border-t-2  border-amber-50 text-[2rem] text-white p-4 pl-[4vw]
        overflow-x-hidden overflow-y-auto "
      >
        <ul className="space-y-3  ">
          {list.map((item, index) => {
            return (
              <li
                className="  w-[73vw]  border-[#1F2937] border-2 p-2
                text-2xl  sm:text-[1.7rem] md:text-[2rem] 
                rounded-2xl sm:p-7  md:p-7  lg:p-7 flex justify-between gap-3 
                hover:bg-[#1F2937]"
                key={index}
              >
                <div
                  className="leftContent flex gap-6
                  sm:gap-10 md:gap-10 lg:gap-13"
                >
                  <button
                    onClick={() => toggleComp(index)}
                    className="active:scale-95 cursor-pointer"
                  >
                    {item.isCompleted ? (
                      <IoIosCheckbox className="text-green-400 " />
                    ) : (
                      <GrCheckbox
                        className="text-amber-50
                        hover:text-green-300"
                      />
                    )}
                  </button>
                  <span
                    className={`${item.isCompleted ? "line-through text-[#9CA3AF]" : ""}`}
                  >
                    {item.content}
                  </span>
                </div>

                <div
                  className="rightContent  flex flex-col sm:flex sm:flex-row 
                md:flex md:flex-row  lg:flex lg:flex-row justify-end space-x-4"
                >
                  {/* Delete button */}
                  <button
                    onClick={() => delbtn(index)}
                    className="active:scale-95 cursor-pointer"
                  >
                    <AiFillDelete
                      className="sm:text-[#9CA3AF] md:text-[#9CA3AF]
                      lg:text-[#9CA3AF]  text-red-700
                       hover:text-red-700  "
                    />
                  </button>

                  {/* Edit button */}
                  <button
                    onClick={(e) => editBtn(index)}
                    className="active:scale-95 cursor-pointer"
                  >
                    <MdModeEdit
                      className="sm:text-[#9CA3AF] md:text-[#9CA3AF]
                      lg:text-[#9CA3AF]  text-blue-400
                       hover:text-blue-400  "
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Userinput;
