import { ICart, IProduct } from "../types/Cart";
import { IGroupedCart } from "../types/IGroupedCart";
import isProductType from "../utils/IsProductType";

const triggerStorageEvent = () => {
    window.dispatchEvent(new Event('storage'));
};

export const addToCart = (productType: keyof ICart, product: IProduct) => {
    const cart: ICart = JSON.parse(localStorage.getItem('cart') || '{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    cart[productType].push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
    triggerStorageEvent();
};

export const decreaseFromCart = (productType: keyof ICart, productId: number) => {
    const cart: ICart = JSON.parse(localStorage.getItem('cart') || '{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    const index = cart[productType].findIndex(product => product.id === productId);

    if (index !== -1) {
        cart[productType].splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        console.log(`Product with ID ${productId} not found in ${productType} cart`);
    }
    triggerStorageEvent();
};

export const removeFromCart = (productType: keyof ICart, productId: number) => {
    const cart: ICart = JSON.parse(localStorage.getItem('cart') || '{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    cart[productType] = cart[productType].filter(product => product.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    triggerStorageEvent();
};

export const getProductsFromCart = () => {
    return localStorage.getItem("cart");
}

export const getGroupedProducts = (cart: ICart): IGroupedCart => {
    const groupedProducts: IGroupedCart = {};

    for (const category in cart) {
        if (isProductType(category)) {
            const products = cart[category];
            groupedProducts[category] = {};

            products.forEach((product) => {
                if (groupedProducts[category][product.id]) {
                    groupedProducts[category][product.id].quantity += 1;
                } else {
                    groupedProducts[category][product.id] = { ...product, quantity: 1 };
                }
            });
        }
    }

    return groupedProducts;
}

export const restartCart = () => {
    const cart: ICart = JSON.parse('{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    localStorage.setItem('cart', JSON.stringify(cart));
    triggerStorageEvent();
}

export const cartLength = () => {
    const cart: ICart = JSON.parse(localStorage.getItem('cart') || '{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    const cartLength = cart["tenis"].length + cart["camisa"].length + cart["mochila"].length + cart["bone"].length;

    return cartLength;
}