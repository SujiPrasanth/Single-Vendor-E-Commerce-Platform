import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sellerbar() {
  const basestyle = "px-4 py-2 md:py-3 rounded-lg text-sm md:text-base text-center transition-all duration-200 whitespace-nowrap";

  const activestyle = "bg-black text-white";
  const inactivestyle = "text-gray-700 hover:bg-gray-200";


  const navigate = useNavigate();

  const logout = async () => {
    const confirmlogout = window.confirm("Are you sure you want to logout?" );

    if (!confirmlogout) {
      return;
    }
    const res = await fetch("https://single-vendor-e-commerce-platform.onrender.com/api/sellerlogout", {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();

    alert(data.msg);

    navigate("/sellerlogin");
  };

  return (
    <div className="col-span-10 md:col-span-2 bg-white border shadow-sm">

      <div className="flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-start gap-2 md:min-h-screen  p-2 md:p-4 overflow-x-auto md:overflow-visible"  >
        <NavLink to="/selleroverview" className={({ isActive }) => `${basestyle} ${isActive ? activestyle : inactivestyle}`}>
          Overview
        </NavLink>

        <NavLink to="/sellerproduct" className={({ isActive }) => `${basestyle} ${isActive ? activestyle : inactivestyle}`} >
          Product
        </NavLink>

        <NavLink to="/addproduct" className={({ isActive }) => `${basestyle} ${isActive ? activestyle : inactivestyle}`}  >
          Add Product
        </NavLink>

        <NavLink to="/sellerorders" className={({ isActive }) => `${basestyle} ${isActive ? activestyle : inactivestyle}`}>
          Orders
        </NavLink>

        <NavLink to="/sellercustomer" className={({ isActive }) => `${basestyle} ${isActive ? activestyle : inactivestyle}`}  >
          Customer
        </NavLink>

        <button onClick={logout} className={`${basestyle} ${inactivestyle} `}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sellerbar;