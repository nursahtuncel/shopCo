import { renderCart } from "./render.js";

const cart  =[];
export { cart };
const updateCart = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  const getFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

const removeFromStorage = (key, productId) => {
  let data = JSON.parse(localStorage.getItem(key)) || [];

  if (!Array.isArray(data)) return; // eğer veri dizi değilse çık

  // productId’si eşleşmeyenleri koru
  data = data.filter(item => item.id !== productId);

  // güncel sepeti kaydet
  localStorage.setItem(key, JSON.stringify(data));
};

  
  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (!Array.isArray(cart)) cart = [];
  
    const existingProduct = cart.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity = Number(product.quantity);
      existingProduct.size = product.size;
      existingProduct.color = product.color;
    } else {
      cart.push(product);
    }
  
    updateCart("cart", cart);
  };
  
  const removeFromCart = (productId) => {
    let cart = getFromStorage("cart") || [];
    cart = cart.filter(item => item.id !== Number(productId)); 
    updateCart("cart", cart);
    renderCart(); 
  };
  

  const getCartCount = () => {
    const cart = getFromStorage("cart") || [];
    return cart.length;
  };
  
  const clearCart = () => {
    updateCart("cart", []);
  };
  
  export {
    updateCart,
    getFromStorage,
    removeFromStorage,
    addProductToCart,
    removeFromCart,
    getCartCount,
    clearCart,
  };
  