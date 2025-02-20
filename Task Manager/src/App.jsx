import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

// list your work LYW
function App() {
  const [Year, setYear] = useState(2025)
  const [date, setDate] = useState("01")
  const [Month, setMonth] = useState("Jan")
  const [Day, setDay] = useState("Wednesday")
  const dateid = useRef(null)
  const [inpval, setinpval] = useState("2025-01-01")

  const dateinfo = () => {
    const dateValue = dateid.current.value;
    setinpval(dateValue)
    {
      const userinput = new Date(dateValue);
      const year = userinput.getFullYear();
      const month = userinput.getMonth();
      const inputdate = userinput.getDate();
      const day = userinput.toLocaleString('en-US', { weekday: 'long' });
      const monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      setYear(year)
      setMonth(monthname[month])
      setDate(inputdate)
      setDay(day)
    }
  }

  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])

  
  useEffect(() => {
    let todostring = JSON.parse(localStorage.getItem("Todos") || "[]");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(todos)
    }
  }, [])

  const saveTOLS = () => {
   localStorage.setItem("Todos", JSON.stringify(Todos))
  }

  const handleSAVE = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }])
    console.log(Todos)
    setTodo("")
    saveTOLS()
  }

  const handleEDIT = (id) => {
    let t = Todos.filter(i => {
      return i.id === id
    })
    setTodo(t[0].Todo)
    let newtodo = Todos.filter(item => {
      return item.id != id
    });
    setTodos(newtodo)
    saveTOLS()
  }


  const handleCHECK = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newtodo = [...Todos];
    newtodo[index].isCompleted = !newtodo[index].isCompleted
    setTodos(newtodo)
    { document.getElementById(id).innerHTML = `<div class="finishedyay w-[98%] rounded-2xl font-bold text-lg px-2 m-2 text-center text-gray-700 border-2 border-blue-900">Task Completed</div>` }
    setTimeout(() => {
      { document.getElementById(id).remove() }
    }, 4000);
    saveTOLS()
  }

  const handleDEL = (e) => {
    let confirm = window.confirm("Are Your Sure You Want To Delete This Task?")
    if (confirm) {
      let newtodo = Todos.filter(item => {
        return item.id != e
      });
      setTodos(newtodo)
      console.log("Task Deleted.")
    }
    else {
      console.log("Deletion Cancelled.")
    }
    saveTOLS()
  }

  const handlechange = (e) => {
    console.log(Todo)
    setTodo(e.target.value)
    saveTOLS()
  }

  return (
    <>
      <nav className='bg-gray-600 flex items-center w-full h-fit p-3 pr-12 justify-between' >
        <div className="flex items-center gap-1">
          <img className='w-10 m-1 ' src="https://static.thenounproject.com/png/26878-200.png" alt="applogo" />
          <div className='font-bold font-serif text-xl'>List Your Work</div>
        </div>
        <ul className="flex font-bold font-serif text-sm gap-4">
          <li className=' hover:underline hover:cursor-pointer' >Home</li>
          <li className=' hover:underline hover:cursor-pointer'>Your Tasks</li>
        </ul>
      </nav>

      <div className="box mx-auto my-3 rounded-2xl min-h-[540px] w-2/5 border-4 p-3 bg-[#F5F5DC] border-[#C0C0C0]">
        <div className="text-xl text-purple-600 text-center font-bold ">Manage Your Tasks At One Place</div>
        <div className='m-3'>
          <div className="day text-center font-bold font-serif text-2xl text-gray-900">{Day}</div>
          <div className="date text-center font-serif text-xl text-gray-900">{date} {Month}, {Year}</div>
        </div>
        <div className='font-serif text-sm text-gray-900'>
          <label htmlFor="date" className="">Set Date: </label>
          <input type="date" className="bg-[#77172f] text-white text-center border border-gray-900 calendar" value={inpval} name='date' ref={dateid} onChange={dateinfo} />
        </div>
        <div className='m-5 flex items-center justify-between'>
          <input type="text" name='task' onChange={handlechange} value={Todo} className='h-10 rounded-full w-[80%] focus:outline-none bg-[#631428] px-5' placeholder='Add a task...' />
          <div onClick={handleSAVE} className="font-xl rounded-full bg-[#520d1e] hover:cursor-pointer font-bold py-2 px-4">Save</div>
        </div>
        <div className="tasks border-black border-t-2 mt-2 p-2">
          {Todos.length === 0 && <div className='text-base font-serif text-[#745834]'>No Task To Display </div>}
          {Todos.map(item => {
            return <div key={item.id} id={item.id} className="text-sm flex items-center px-2 ">
              <input type="checkbox" name={item.id} onChange={handleCHECK} className='rounded-full' />
              <div className="font-bold text-[#745834] w-[70%] text-sm m-2">{item.Todo}</div>
              <div onClick={() => { handleEDIT(item.id) }} className="text-xs rounded-full bg-[#520d1e] m-1 hover:cursor-pointer font-bold py-2 px-4">Edit</div>
              <div onClick={() => { handleDEL(item.id) }} className="text-xs rounded-full bg-[#520d1e] m-1 hover:cursor-pointer font-bold py-2 px-4">Delete</div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
