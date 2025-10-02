
const cart  =[];
export { cart };
const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  const getFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  const removeFromStorage = (key) => {
    localStorage.removeItem(key);
  };
  
  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (!Array.isArray(cart)) cart = [];
  
    const existingProduct = cart.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity = Number(product.quantity);
    } else {
      cart.push(product);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  const removeFromCart = (productId) => {
    let cart = getFromStorage("cart") || [];
    cart = cart.filter(item => item.id !== productId);
    saveToStorage("cart", cart);
  };
  

  const getCartCount = () => {
    const cart = getFromStorage("cart") || [];
    return cart.length;
  };
  
  const clearCart = () => {
    saveToStorage("cart", []);
  };
  
  export {
    saveToStorage,
    getFromStorage,
    removeFromStorage,
    addProductToCart,
    removeFromCart,
    getCartCount,
    clearCart,
  };
  