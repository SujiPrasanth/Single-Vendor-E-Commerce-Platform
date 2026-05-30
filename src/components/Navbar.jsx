import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handlesignout = async () => {
    const confirmlogout = window.confirm("Are you sure you want to logout?");

    if (!confirmlogout) {
      return;
    }

    const res = await fetch("http://localhost:3001/api/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json()
    if (!res.ok) {
      alert(data.msg)
    } else {
      alert(data.msg)
      console.log(data)
      navigate('/login')
    }


  };

  const linkStyle = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold text-xl" : "text-xl text-gray-600 hover:text-blue-600 transition font-semibold";

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600 tracking-wide">
            MultiCart
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm md:text-base">
            <NavLink to="/home" className={linkStyle}>
              Home
            </NavLink>
            <NavLink to="/cart" className={linkStyle}>
              Cart
            </NavLink>
            <NavLink to="/orders" className={linkStyle}>
              My Orders
            </NavLink>
            <NavLink to="/login" className={linkStyle}>
              Login
            </NavLink>
            <NavLink to="/sellerlogin" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition shadow-sm">
              Admin
            </NavLink>
            <button onClick={handlesignout}>
              <FiLogOut size={25} />
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={handlesignout}>
              <FiLogOut className="text-2xl text-gray-700" />
            </button>
            <button className="text-3xl text-gray-700" onClick={() => setOpen(!open)} >
              {open ? <IoClose /> : <FiMenu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-lg">
            <NavLink onClick={() => setOpen(false)} to="/home" className={linkStyle} >
              Home
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/cart" className={linkStyle}>
              Cart
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/orders" className={linkStyle}>
              My Orders
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/login" className={linkStyle}>
              Login
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/sellerlogin" className={linkStyle} >
              Admin
            </NavLink>

          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;