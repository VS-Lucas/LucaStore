import { ICart } from "../types/Cart";

const isProductType = (key: string): key is keyof ICart => {
    return ['tenis', 'camisa', 'mochila', 'bone'].includes(key);
  };

export default isProductType;