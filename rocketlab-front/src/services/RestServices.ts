// services/RestServices.ts
import axios from 'axios';
import { ITenis } from '../types/Tenis';
import { ICamisa } from '../types/Camisa';
import { IMochila } from '../types/Mochila';
import { IBone } from '../types/Bone';

const BASE_URL = 'http://localhost:3000';

export const FetchProdutos = async (categoria: string) => {
  if (categoria === "tenis") {
    const tenis = await axios.get<ITenis[]>(`${BASE_URL}/tenis`);
    return {
      tenis: tenis.data
    };
  }

  else if (categoria === "camisa") {
    const camisa = await axios.get<ICamisa[]>(`${BASE_URL}/camisa`);
    return {
      camisa: camisa.data
    };
  }

  else if (categoria === "mochila") {
    const mochila = await axios.get<IMochila[]>(`${BASE_URL}/mochila`);
    return {
      mochila: mochila.data
    };
  }

  else if (categoria === "bone") {
    const bone = await axios.get<IBone[]>(`${BASE_URL}/bone`);
    return {
      bone: bone.data
    };
  }
};
