const quantity = (increaseBtn, decreaseBtn, quantitySpan) => {
    
  let quantity = 1;
  increaseBtn.addEventListener("click", () => {
    quantity++;
    quantitySpan.textContent = quantity;
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
    }
  });
};
export default quantity ;
