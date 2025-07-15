import Input from "./components/Input"
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'


const App = () => {
  return (
    <div className="lg:w-[1000px] border-2 border-green-400 w-full h-auto mx-auto my-10 bg-[#e9ebee] rounded-2xl inset-shadow-2xs overflow-hidden">
      <div className="sm:p-10 lg:w-[900px] h-auto mx-auto">
      <h1 className="text-center font-bold text-2xl">TodoList</h1>
      <ToastContainer />
      <Input />
      </div>
      </div>

  )
}
export default App