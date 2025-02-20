import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [show,setshow] = useState(false);
  const [form, setform] = useState({ site: "", username: "", pass: "" })
  const [array, setarray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("info")
    if (passwords) {
      setarray(JSON.parse(passwords))
    }
  }, [])

  const saveTOLS = () => {
    localStorage.setItem("info", JSON.stringify([...array, form]))
  }

  const savepass = () => {
    setarray([...array, form])
    setform({ site: "", username: "", pass: "" })
    saveTOLS()
    console.log([...array, form])
  }

  const change = () => { 
    setshow(!show)
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const handledelete = (e) => {
    if (window.confirm("Delete Password?")) {
      let newarray = array.filter(item => {
        return item.username != e
      })
      setarray(newarray)
      console.log("Successfully Deleted.")
      saveTOLS()
    }
    else {
      console.log("Deletion Cancelled.")
    }
  }
  const handleedit = (e) => {
    let a = array.filter(item => {
      return item.username === e
    })
    setform(a[0])
    let newarray = array.filter(item => {
      return item.username != e
    })
    setarray(newarray)
    saveTOLS()
  }

  return (
    <>
      <Navbar />
      <div className='bg-[#fff6e7cc] py-3 min-h-[80vh] '>
        <div className='text-2xl text-center text-white'>
          <span className='text-[#df4c3f] font-bold font-serif' >&lt;Pass Manager/&gt;</span>
          <div className='text-gray-500 text-base'>Your Own Password Manager</div>
        </div>
        <div className='mx-auto my-4 w-[80vw] space-y-2'>
          <input type="text" onChange={handlechange} value={form.site} name="site" placeholder='Enter website URL' className='py-[6px] px-[12px] border-2 border-[#F9D8A4] rounded-full w-full' />
          <div className='flex flex-row justify-between w-full items-center max-sm:flex-col ' >
            <input type="text" onChange={handlechange} value={form.username} name="username" placeholder='Enter Username' id="" className='py-[6px] px-[12px] border-2 max-sm:w-full w-[50vw] border-[#F9D8A4] rounded-full' />
            <div className='relative'>
              <input placeholder='Enter Password' onChange={handlechange} value={form.pass} className='py-[6px] pl-[12px] pr-[42px] max-sm:w-full w-[25vw] border-2 border-[#F9D8A4] rounded-full' type={show ?"text":"password"} name="pass" id="" />
              <img onClick={change} className='hover:cursor-pointer w-[23px] absolute top-2 right-4' src={show ? "https://cdn-icons-png.flaticon.com/128/10812/10812267.png":"https://cdn-icons-png.flaticon.com/128/159/159604.png"} alt="" />
            </div>
          </div>
        </div>
        <div onClick={savepass} className='hover:cursor-pointer hover:bg-[#FF6F61] border-2 border-[#c9473b] bg-[#f15142] m-auto w-[90px] flex justify-center items-center rounded-full py-2 px-3 gap-2'>
          <div><img src="https://cdn-icons-png.flaticon.com/128/6421/6421329.png" alt="" /></div>
          <div className='font-bold text-white'>Save</div>
        </div>
        <div className='font-bold m-[10px] px-[70px] text-lg'>Your Passwords !!</div>
        {array.length === 0 && <div className='text-base px-[70px]'>No passwords to show.</div>}
        {array.length !== 0 && <table className="table-fixed w-[72vw] m-auto">
          <thead className='bg-[#fd6051] text-sm font-serif text-white'>
            <tr>
              <th className='w-[35%] p-1 border'>Website URL</th>
              <th className='w-[15%] border'>Username</th>
              <th className='w-[15%] border'>Password</th>
              <th className='w-[10%] border'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-[#ffe8e6]'>
            {array.map(item => {
              return <tr key={item.username} className='text-center'>
                <td className='border p-1'>{item.site}</td>
                <td className='border'>{item.username}</td>
                <td className='border'>{item.pass}</td>
                <td className='border'>
                  <div className='flex justify-center'>
                    <svg onClick={() => { handleedit(item.username) }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFD700"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" /></svg>
                    <svg onClick={() => { handledelete(item.username) }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFD700"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                  </div>
                </td>
              </tr>
            })}
          </tbody>
        </table>}

      </div>
      <Footer />
    </>
  )
}

export default App
