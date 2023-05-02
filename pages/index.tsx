import { useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";


type Todo = {
  task: string;
  status: boolean;
};

function Home() {

    const [list, setList] = useState([] as Todo[]);
    const [task, setTask] = useState("");
  
    const addTask = () => {
      if (task.trim()) {
        setList((last) => [...last, { task, status: false }]);
        toast.success("your task has been added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTask("");
      }
    };
    const removeTask = (index: number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setList((Last) => {
            const help: Todo[] = [...Last];
            help.splice(index, 1);
            return [...help];
          });
        }
      });
    };
  
    const statusHandller = (index: number) => {
      setList((last) => {
        const help: Todo[] = JSON.parse(JSON.stringify(last));
        help[index].status = !help[index].status;
        return [...help];
      });
    };

return (
  <div className="App">
    <form className="2xl:w-3/4 xl:w-3/4 lg:w-3/4 md:w-full sm:w-full xsm:w-full xxsm:w-full mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center border-b border-zinc-500">
        <input
          onChange={(e) => setTask(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mx-1 py-2 px-2 text-xl leading-tight focus:outline-none"
          type="text"
          placeholder="Enter your task"
          value={task}
        ></input>
        <button
          className="flex-shrink-0 bg-zinc-900 hover:bg-zinc-700 border-zinc-500 hover:border-zinc-700 text-xl border-4 text-white py-2 px-2 rounded"
          type="submit"
          onClick={() => addTask()}
        >
          Add
        </button>
        <button
          className="flex-shrink-0 border-transparent border-4 text-zinc-900 hover:text-teal-800 text-xl py-2 px-2 rounded"
          type="submit"
          onClick={() => {
            setTask("");
            toast.info("your task has been canceled", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }}
        >
          Cancel
        </button>
      </div>
    </form>

    <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 gap-3 lg:grid-cols-2 md:grid-cols-1 justify-center justify-items-center	 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 ">
      {list.map((item, index) => {
        return (
          <div
            key={index}
            className={
              item.status
                ? "2xl:w-96 xl:w-96 lg:w-80 md:w-72 h-56 p-8 flex flex-col m-10 overflow-auto	break-normal justify-between items-center bg-green-500 rounded-full"
                : "2xl:w-96 xl:w-96 lg:w-80 md:w-72  h-56	 p-8 flex flex-col m-10 overflow-auto	break-normal justify-between items-center bg-red-500 rounded-full"
            }
          >
            <p className="mb-3 text-xl font-xl text-white dark:text-white">
              {item.task}
            </p>
            <div>
              <button
                className={
                  "px-3 py-2 text-lg font-lg text-center text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800 2xl:mr-12 xl:mr-10 md:mr-8 sm:mr-6 xsm:mr-4 xxsm:mr-4"
                }
                onClick={() => statusHandller(index)}
              >
                {item.status ? "Undone" : "Done"}
              </button>
              <button
                className="px-3 py-2 text-lg font-lg text-center text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800 2xl:ml-12 xl:ml-10 md:ml-8 sm:ml-6 xsm:ml-4 xxsm:ml-4"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
    <ToastContainer />
  </div>
);
}

export default Home;