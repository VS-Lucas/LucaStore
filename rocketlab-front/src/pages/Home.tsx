import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GiConverseShoe } from "react-icons/gi";
import { PiTShirt } from "react-icons/pi";
import { PiBackpackLight } from "react-icons/pi";
import { PiBaseballCap } from "react-icons/pi";

import { MdOutlineShoppingCart } from "react-icons/md";

import { FetchProdutos } from '../services/RestServices';

import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

import { ITenis } from '../types/Tenis';
import { ICamisa } from '../types/Camisa';
import { IMochila } from '../types/Mochila';
import { IBone } from '../types/Bone';

import { addToCart } from '../services/CartServices';
import { IProduct } from '../types/Cart';
import isProductType from '../utils/IsProductType';
import ConfirmToast from '../utils/ConfirmToast';

export default function HomePage() {
  const [data, setData] = useState<ITenis[] | ICamisa[] | IMochila[] | IBone[]>([]);
  const [categoria, setCategoria] = useState<'tenis' | 'camisa' | 'mochila' | 'bone'>('tenis');

  useEffect(() => {
    const getData = async () => {
      const produtos = await FetchProdutos(categoria);
      if (produtos && produtos.tenis) {
        setData(produtos.tenis);
      }
    };

    getData();
  }, [categoria]);

  const handleCategoriaChange = (categoria: 'tenis' | 'camisa' | 'mochila' | 'bone') => {
    setCategoria(categoria);

    const getData = async () => {
      const produtos = await FetchProdutos(categoria);

      if (produtos) {
        setData(produtos[categoria]!);
      }

    };

    getData();
  };

  const handleAddToCart = (categoria: string, produto: IProduct) => {
    if (isProductType(categoria)) {
      addToCart(categoria, produto);
    } else {
      console.error(`Invalid category: ${categoria}`);
      return;
    }

    toast.success('Produto adicionado ao carrinho', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  return (
    <>
      <Navbar />
      <div>
        {/* Title */}
        <div className="pt-8 pb-6 bg-gray-100">
          <h1 className="text-center text-2xl font-bold text-gray-800">Produtos</h1>
        </div>

        {/* Product List */}
        <section className="pb-10 bg-gray-100 ">

          {/* Tab Menu */}
          <div className="flex flex-wrap items-center overflow-x-auto overflow-y-hidden justify-center text-gray-800">
            <button onClick={() => handleCategoriaChange('tenis')} className="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600">
              <GiConverseShoe />
              <span className='pl-2'>Tênis</span>
            </button>
            <button onClick={() => handleCategoriaChange('camisa')} className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900">
              <PiTShirt />
              <span className='pl-2'>Camisas</span>
            </button>
            <button onClick={() => handleCategoriaChange('mochila')} className="flex items-center flex-shrink-0 px-5 py-3 space-x-2">
              <PiBackpackLight />
              <span className='pl-2'>Mochilas</span>
            </button>
            <button onClick={() => handleCategoriaChange('bone')} className="flex items-center flex-shrink-0 px-5 py-3 space-x-2">
              <PiBaseballCap />
              <span className='pl-2'>Bonés</span>
            </button>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {data.map(produto => (
              <article key={produto.id} className="rounded-3xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <div className="relative overflow-hidden rounded-xl">
                  <a href={`/product/${categoria}/${produto.id}`}><img className="h-48 w-full object-cover" src={produto.imgUrl} alt={produto.descricao} /></a>
                </div>

                <div className="mt-1 p-2">
                  <h2 className="text-slate-700">{produto.nome}</h2>
                  <p className="mt-1 text-sm text-slate-400">{produto.descricao}</p>

                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-blue-500">{produto.preco}</p>

                    <button className="flex items-center text-sm space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600" onClick={() => handleAddToCart(categoria, produto)}>
                      <MdOutlineShoppingCart />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
      <Footer />
      <ConfirmToast />
    </>
  );
}