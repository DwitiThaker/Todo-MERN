import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { useAuth } from "./Store/Auth"

export const Navbar = () => {
  const {isLoggedIn} = useAuth();
    console.log("Navbar rendered. isLoggedIn =", isLoggedIn);

  return (
    <div>
      <header>
        <div className="container">
            <div className="logo-brand">
                <NavLink to="/">Todo List</NavLink>
            </div>

            <nav>
                <ul>
                    <li> <NavLink to="/">Home</NavLink> </li>
                    
                    {isLoggedIn ? (<> <li> <NavLink to="/View">View</NavLink> </li> <li> <NavLink to="/Logout">Logout</NavLink> </li> </>) : (<li> <NavLink to="/Login">Login</NavLink> </li>)}
                    
                    <li> <NavLink to="/Register">Register</NavLink> </li>
                </ul>
            </nav>
        </div>
      </header>
    </div>
  )
}

