import { useState, useEffect } from "react";
import List from "./List";
import type { Todo } from "../types";
import { getData, createData } from "../api/todo";
import { toast } from "react-toastify"

const Input = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const loadData = async () => {
    try {
      const res = await getData();
      setTodos(res.data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddData = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      const res = await createData({ title: trimmed });
      setTitle("");
      toast.success(`เพิ่ม ${res.data.newTodo.title} สำเร็จ`);
      loadData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddData();
    }
  };


  return (
    <>
      <div className="flex  w-[600px] items-center h-[60px] mx-auto mt-2 rounded-[16px] ">
        <input
          type="text"
          name="title"
          placeholder="เพิ่มกิจกรรมของคุณ"
          className="w-full p-[9px] text-[20px] bg-[#ffffff] border-none focus:outline-none sm:rounded-l-2xl"
          value={title}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAddData}
          className="hidden sm:flex cursor-pointer p-[12px] text-white bg-green-600 rounded-r-2xl hover:scale-125 hover:rounded-2xl"
        >
          Add
        </button>
          </div>
          <div className="text-center">
          <button
          onClick={handleAddData}
          className="sm:hidden  w-[70px] p-[12px] cursor-pointer text-white bg-green-600 rounded-2xl hover:scale-125 hover:rounded-2xl"
        >
          Add
        </button>
          </div>
        <div className="w-[300px] sm:w-full my-[20px] mx-auto flex flex-col space-y-2 rounded-2xl items-center break-words whitespace-normal">
          {todos.map((item, index) => (
            <List key={index} item={item} loadData={loadData} />
          ))}
        </div>
    </>
  );
};

export default Input;
