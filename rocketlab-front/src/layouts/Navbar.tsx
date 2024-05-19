import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { cartLength } from "../services/CartServices";
import { useNavigate } from "react-router-dom";
import logo from "../icons/lucastorelogo.svg"

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartLength = () => {
      setCartItemCount(cartLength());
    };

    updateCartLength();

    window.addEventListener('storage', updateCartLength);

    return () => {
      window.removeEventListener('storage', updateCartLength);
    };
  }, []);

  const handleToCart = () => {
    navigate("/cart");
  };

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex justify-between flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} className="w-48 h-12" alt="Logo LucaStore" />
        </a>
        <div>
          <button onClick={handleToHome} type="button" className="relative mr-4 inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-100 md:hover:bg-blue-200 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            <IoHomeOutline className="text-2xl" />
          </button>
          <button onClick={handleToCart} type="button" className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-100 md:hover:bg-blue-200 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            <MdOutlineShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartItemCount}</div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
