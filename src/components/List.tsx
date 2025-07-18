import type { TodoProps } from '../types';
import { useState } from 'react';
import { removeData, updateData } from '../api/todo';
import { toast } from "react-toastify"
import { FaRegEdit } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { MdDone, MdClose } from "react-icons/md"; 

const List = ({ item, loadData }: TodoProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState<string>(item.title);
  const [complete, setComplete] = useState<boolean>(false); 

  const handleDelete = async (id: number) => {
    try {
      const res = await removeData(id);
      console.log(res.data.message);
      toast.success(`ลบ ${res.data.deleted.title} สำเร็จ`);
      loadData();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleConfirm = async (id: number) => {
    try {
      const res = await updateData(id, { title }); 
      setIsEdit(false);
      toast.success(`แก้ไข ${res.data.updated.title} สำเร็จ`);               
      loadData();                    
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const toggleComplete = () => {
    setComplete(prev => !prev);
    toast.success('ภารกิจคุณเสร็จแล้ว');
  };

  return (
    <>
    <div className="flex justify-between items-center bg-white rounded-xl p-3 shadow w-full border border-[#dbdbdb]">
      <div
        className={`text-[16px] w-full sm:w-[400px] break-words whitespace-normal ${
          complete ? "line-through text-gray-400" : ""
        }`}
      >
        {isEdit ? (
          <input
            type="text"
            value={title}
            onChange={handleOnChange}
            className="border px-1 py-1  rounded w-full"
          />
        ) : (
          <span>{title}</span>
        )}
      </div>

      <div className="hidden sm:flex gap-2 ml-4 items-center">
        <button
          onClick={toggleComplete}
          className={`p-1 rounded text-white text-2xl ${
            complete ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          title={complete ? "ยังไม่เสร็จ" : "เสร็จแล้ว"}
        >
          {complete ? <MdClose /> : <MdDone />}
        </button>

        {isEdit ? (
          <button
            onClick={() => handleConfirm(item.id)}
            className="p-1 rounded bg-green-500 text-white text-2xl hover:bg-green-600"
          >
            <MdDone />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="p-1 rounded bg-yellow-400 text-white text-2xl hover:bg-yellow-500"
          >
            <FaRegEdit />
          </button>
        )}

        <button
          onClick={() => handleDelete(item.id)}
          className="p-1 rounded bg-red-500 text-white text-2xl hover:bg-red-600"
        >
          <CiCircleRemove />
        </button>
      </div>
      
    </div>
    <div className='flex sm:hidden w-full justify-center gap-2'>
      <button
          onClick={toggleComplete}
          className={`p-1 rounded text-white text-2xl ${
            complete ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          title={complete ? "ยังไม่เสร็จ" : "เสร็จแล้ว"}
        >
          {complete ? <MdClose /> : <MdDone />}
        </button>

        {isEdit ? (
          <button
            onClick={() => handleConfirm(item.id)}
            className="p-1 rounded bg-green-500 text-white text-2xl hover:bg-green-600"
          >
            <MdDone />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="p-1 rounded bg-yellow-400 text-white text-2xl hover:bg-yellow-500"
          >
            <FaRegEdit />
          </button>
        )}

        <button
          onClick={() => handleDelete(item.id)}
          className="p-1 rounded bg-red-500 text-white text-2xl hover:bg-red-600"
        >
          <CiCircleRemove />
        </button>
      </div>
      </>
  );
};

export default List;
