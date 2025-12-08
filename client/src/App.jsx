
import {Navbar} from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Register } from "./Pages/Register"
import { Login } from "./Pages/Login"
import { Error } from "./Pages/Error"
import { Logout } from "./Pages/Logout"
import { Todo } from "./Pages/Todo"
import { CreateTodo } from "./Pages/CreateTodo"
import { EditTodo } from "./Pages/EditTodo"




import './App.css'


function App() {
  
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/View" element={<Todo/>}/>
      <Route path="/Create" element={<CreateTodo/>}/>
<Route path="/edit/:id" element={<EditTodo />} />
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Logout" element={<Logout/>}/>
      <Route path="*" element={<Error/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
