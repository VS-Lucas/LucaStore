import { ICart, IProduct } from "../types/Cart";

export const addToCart = (productType: keyof ICart, product: IProduct) => {
    console.log(`Adding product with ID ${product.id} to ${productType} cart`);

    const cart: ICart = JSON.parse(localStorage.getItem('cart') || '{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    cart[productType].push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const decreaseFromCart = (productType: keyof ICart, productId: number) => {
    console.log(`Decreasing product with ID ${productId} from ${productType} cart`);

    const cart: ICart = JSON.parse(localStorage.getItem('cart') || '{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    const index = cart[productType].findIndex(product => product.id === productId);

    if (index !== -1) {
        cart[productType].splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Product with ID ${productId} decreased from ${productType} cart`);
    } else {
        console.log(`Product with ID ${productId} not found in ${productType} cart`);
    }
};

export const removeFromCart = (productType: keyof ICart, productId: number) => {
    console.log(`Removing product with ID ${productId} from ${productType} cart`);

    const cart: ICart = JSON.parse(localStorage.getItem('cart') || '{"tenis":[],"camisa":[],"mochila":[],"bone":[]}');

    cart[productType] = cart[productType].filter(product => product.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getProductsFromCart = () => {
    return localStorage.getItem("cart");
}