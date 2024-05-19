import { useEffect, useState } from 'react';
import Navbar from "../layouts/Navbar";
import { getGroupedProducts, getProductsFromCart, removeFromCart, restartCart } from '../services/CartServices';
import { IGroupedCart } from '../types/IGroupedCart';
import { FaRegTrashAlt } from "react-icons/fa";
import isProductType from '../utils/IsProductType';
import { ICart, IProduct } from '../types/Cart';
import { useNavigate } from "react-router-dom";
import { addToCart, decreaseFromCart } from '../services/CartServices';
import { toast } from 'react-toastify';
import ConfirmToast from '../utils/ConfirmToast';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<IGroupedCart>({});
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = getProductsFromCart();
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      const groupedProducts = getGroupedProducts(parsedCart);
      setCartItems(groupedProducts);
    }
  }, []);

  const handleRemove = (category: string, productId: number) => {
    if (isProductType(category)) {
      removeFromCart(category, productId);
      setCartItems((prevCartItems) => {
        const updatedCategory = { ...prevCartItems[category] };
        delete updatedCategory[productId];

        if (Object.keys(updatedCategory).length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [category]: _, ...rest } = prevCartItems;
          return rest;
        }

        return {
          ...prevCartItems,
          [category]: updatedCategory,
        };
      });
    }
  };

  const handleIncreaseQuantity = (category: string, product: IProduct) => {
    if (isProductType(category)) {
      addToCart(category, product);
      const cartData = getProductsFromCart();
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        const groupedProducts = getGroupedProducts(parsedCart);
        setCartItems(groupedProducts);
      }
    }
  };

  const handleDecreaseQuantity = (category: string, productId: number) => {
    if (isProductType(category)) {
      decreaseFromCart(category, productId);
      const cartData = getProductsFromCart();
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        const groupedProducts = getGroupedProducts(parsedCart);
        setCartItems(groupedProducts);
      }
    }
  };

  const getTotalPrice = () => {
    if (cartItems) {
      let total = 0;
      for (const category in cartItems) {
        total += Object.values(cartItems[category]).reduce((acc, product) => {
          return acc + product.preco * product.quantity;
        }, 0);
      }
      return total;
    }
    return 0;
  };

  const isCartEmpty = () => {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return true;

    const cart: ICart = JSON.parse(cartData);
    return (
      cart.tenis.length === 0 &&
      cart.camisa.length === 0 &&
      cart.mochila.length === 0 &&
      cart.bone.length === 0
    );
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleBuy = () => {
    toast.success('Compra realizada com sucesso', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      restartCart();
      navigate("/");
    }, 2500);
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-8">
        {!isCartEmpty() && (
          <h1 className="mb-10 text-center text-2xl font-bold">Itens no carrinho</h1>
        )}
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {isCartEmpty() ? (
            <div className="text-center w-full">
              <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
              <p className="text-gray-700 mb-6">Adicione itens ao seu carrinho para vê-los aqui.</p>
              <button onClick={() => handleBackHome()} className="mb-6 w-44 rounded-lg bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Continuar comprando</button>
            </div>
          ) : (
            <>
              <div className="rounded-lg md:w-2/3 mb-16">
                {Object.keys(cartItems).map(category => (
                  <div key={category}>
                    {Object.values(cartItems[category]).map(product => (
                      <div key={product.id} className="justify-between mb-6 rounded-3xl bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src={product.imgUrl} alt={product.nome} className="h-40 min-w-40 object-cover rounded-xl sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900">{product.nome}</h2>
                            <p className="mt-1 text-xs text-gray-700">{product.descricao}</p>
                          </div>
                          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex justify-end items-center border-gray-100">
                              <span onClick={() => handleDecreaseQuantity(category, product.id)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                              <p className='px-2'>{product.quantity}</p>
                              <span onClick={() => handleIncreaseQuantity(category, product)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="text-sm">R$ {(product.preco * product.quantity).toFixed(2)}</p>
                              <button type='button' onClick={() => handleRemove(category, product.id)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* Sub total */}
              <div className="mt-6 h-full rounded-3xl border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">R${getTotalPrice().toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Frete</p>
                  <p className="text-gray-700">R$4.99</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">R$ {(getTotalPrice() + 4.99).toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => handleBuy()} className="mt-6 w-full rounded-lg bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Finalizar compra</button>
              </div>
            </>
          )}
        </div>
      </div>
      <ConfirmToast />
    </>
  );
}
