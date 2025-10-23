import { uiElements } from "./ui.js";
import getStars from "./getStars.js";
import quantity from "./quantity.js";
import { getShortTitle, getShortParagraph } from "./helper.js";
import { cart, addProductToCart, getFromStorage, removeFromCart } from "./localStorage.js";

const renderProducts = (products, targetElement, titleText, limit) => {
  const titleHTML = `<h2 class="ProductContainerTitle">${titleText}</h2>`;
  const limitedProducts = limit ? products.slice(limit - 4, limit) : products;

  const productsHTML = limitedProducts
    .map(
      (product) => `
    <div class="card-container-item" data-id="${product.id}">
      <img src="${product.image}" alt="${product.title}">
      <div class="itemContent">
        <h3>${getShortParagraph(product.title)}</h3>
        <p>$${product.price}</p>
         <span class="star"> ${getStars(product.rating.rate)}</star>
      </div>
     <p>${product.price}</p>
    </div>
    
  `
    )
    .join("");

  targetElement.innerHTML =
    titleHTML +
    `<div class="card-container">${productsHTML}</div>` +
    (limit && products.length > limit
      ? `<div class="viewAllButtonContainer"><button class="viewAllButton">View All</button></div>`
      : `<div class="viewAllButtonContainer"><button class="viewAllButton viewLessButton">View Less</button></div>`);
  const btn = targetElement.querySelector(".viewAllButton");
  if (btn) {
    btn.addEventListener("click", () => {
      renderProducts(products, targetElement, titleText, null);
    });
  }
  const btn2 = targetElement.querySelector(".viewLessButton");
  if (btn2) {
    btn2.addEventListener("click", () => {
      limit = targetElement == uiElements.newArrivals ? 4 : 8;
      renderProducts(products, targetElement, titleText, limit);
    });
  }

  const cards = targetElement.querySelectorAll(".card-container-item");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.getAttribute("data-id");
      window.location.href = `/productDetail.html?id=${productId}`;
    });
  });
};

const renderRewiews = (reviews) => {
  const reviewsHTML = reviews
    .map((review) => {
      let shortName;
      if (review.name) {
        let [firstName, lastName] = review.name.split(" ");
        shortName = lastName ? `${firstName} ${lastName[0]}.` : firstName;
      }
      return `
    <div class="slide">
      <span class="star">${getStars(review.rating)}</span>  
      <span class="reviewerName">   
        <img class="tik" src="./../images/tik.svg" alt="">
        ${shortName}
      </span> 
      <p>${review.comment}</p>  
    </div>
 
  `;
    })
    .join("");

  uiElements.slider.innerHTML = reviewsHTML;
};

const renderProductDetail = (products) => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find((product) => product.id == productId);
  const productHTML = `
  <div>
   <div class="breadCrumb">
 <a href="homePage.html">Home <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
<path d="M1.53061 0.469402L6.53061 5.4694C6.60053 5.53908 6.65601 5.62187 6.69386 5.71304C6.73172 5.8042 6.7512 5.90194 6.7512 6.00065C6.7512 6.09936 6.73172 6.1971 6.69386 6.28827C6.65601 6.37943 6.60053 6.46222 6.53061 6.5319L1.53061 11.5319C1.38972 11.6728 1.19862 11.752 0.999362 11.752C0.800105 11.752 0.609009 11.6728 0.468112 11.5319C0.327216 11.391 0.248062 11.1999 0.248062 11.0007C0.248062 10.8014 0.327216 10.6103 0.468112 10.4694L4.93749 6.00003L0.467488 1.53065C0.326592 1.38976 0.247437 1.19866 0.247437 0.999403C0.247437 0.800145 0.326592 0.609049 0.467488 0.468153C0.608384 0.327257 0.799481 0.2481 0.998738 0.2481C1.198 0.2481 1.38909 0.327257 1.52999 0.468153L1.53061 0.469402Z" fill="black" fill-opacity="0.6"/>
</svg></a> 
 <a href="#">Shop <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
<path d="M1.53061 0.469402L6.53061 5.4694C6.60053 5.53908 6.65601 5.62187 6.69386 5.71304C6.73172 5.8042 6.7512 5.90194 6.7512 6.00065C6.7512 6.09936 6.73172 6.1971 6.69386 6.28827C6.65601 6.37943 6.60053 6.46222 6.53061 6.5319L1.53061 11.5319C1.38972 11.6728 1.19862 11.752 0.999362 11.752C0.800105 11.752 0.609009 11.6728 0.468112 11.5319C0.327216 11.391 0.248062 11.1999 0.248062 11.0007C0.248062 10.8014 0.327216 10.6103 0.468112 10.4694L4.93749 6.00003L0.467488 1.53065C0.326592 1.38976 0.247437 1.19866 0.247437 0.999403C0.247437 0.800145 0.326592 0.609049 0.467488 0.468153C0.608384 0.327257 0.799481 0.2481 0.998738 0.2481C1.198 0.2481 1.38909 0.327257 1.52999 0.468153L1.53061 0.469402Z" fill="black" fill-opacity="0.6"/>
</svg></a> 
 <a href="#">${
   product.category
 } <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
<path d="M1.53061 0.469402L6.53061 5.4694C6.60053 5.53908 6.65601 5.62187 6.69386 5.71304C6.73172 5.8042 6.7512 5.90194 6.7512 6.00065C6.7512 6.09936 6.73172 6.1971 6.69386 6.28827C6.65601 6.37943 6.60053 6.46222 6.53061 6.5319L1.53061 11.5319C1.38972 11.6728 1.19862 11.752 0.999362 11.752C0.800105 11.752 0.609009 11.6728 0.468112 11.5319C0.327216 11.391 0.248062 11.1999 0.248062 11.0007C0.248062 10.8014 0.327216 10.6103 0.468112 10.4694L4.93749 6.00003L0.467488 1.53065C0.326592 1.38976 0.247437 1.19866 0.247437 0.999403C0.247437 0.800145 0.326592 0.609049 0.467488 0.468153C0.608384 0.327257 0.799481 0.2481 0.998738 0.2481C1.198 0.2481 1.38909 0.327257 1.52999 0.468153L1.53061 0.469402Z" fill="black" fill-opacity="0.6"/>
</svg></a>
 <a class="breadCrumbTitle" href="#">${getShortTitle(product.title)}</a>
 </div>

     <div class="productDetail">
         <div class="productDetailImages">
         <img src="${product.image}" alt="${product.title}" />
         <img src="${product.image}" alt="${product.title}" />
         <img src="${product.image}" alt="${product.title}" />
       </div>
       <div class="productDetailImage">
         <img src="${product.image}" alt="${product.title}" />
       </div>
       <div class="productDetailContent">
         <div class="productDetailContentText">
           <h3>One Life Graphic Tshirt</h3>
            <span class="star"> ${getStars(product.rating.rate)}</star>
           <div class="productDetailContentTextPrices">
             <span class="productPrice">$${product.price}</span>
             <span class="oldPrice">$${product.price}</span>
             <span class="discount">20%</span>
           </div>
           <p class="productDetailContentTextDescription">
             ${product.description}
           </p>
       <hr/>
         </div>
        <div class="productDetailContentSizeTitle">Select Colors</div>
           <div class="productDetailContentColors">
             <button class="selected" data-color="red"><i class="fa fa-check"></i></button>
             <button data-color="blue"><i class="fa fa-check"></i></button>
             <button data-color="green"><i class="fa fa-check"></i></button>
         </div>
         <hr/>
         <div class="productDetailContentSize"> 
         
         <div class="productDetailContentSizeTitle">Choose Size</div>
         <div class="productDetailContentSizeButtons">
           <button  class="selected sizeButton">Small</button>
           <button class="sizeButton">Medium</button>
           <button class="sizeButton">Large</button>
           <button class="sizeButton">X-Large</button>
           
           
         </div>
         <hr/>
       </div>         
<div class="productDetailButtons">
  <div class="productDetailButtonsContainer">
 <div class="quantitySelector">
  <button class="decrease">-</button>
  <span id="quantity">1</span>
  <button class="increase">+</button>
</div>

    <button id="addToCart" class="addToCart" data-product-id="${
      product.id
    }">Add to Cart</button>
  </div>
</div>

       </div></div>`;

  uiElements.imagesDiv.innerHTML = `  
   <img src="${product.image}" alt="">
   <img src="${product.image}" alt="">
    <img src="${product.image}" alt="">`;

  uiElements.productDetail.innerHTML = productHTML;
  let size;
  let color;

  const addToCart = document.querySelector("#addToCart");
  const colorButtons = document.querySelectorAll(
    ".productDetailContentColors button"
  );

  const productDetailImage = document.querySelector(".productDetailImage img");
  const sizeButtons = document.querySelectorAll(".sizeButton");
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      productDetailImage.style.backgroundColor = btn.dataset.color;
      color = btn.dataset.color;
    });
  });
  const decreaseBtn = document.querySelector(".decrease");
  const increaseBtn = document.querySelector(".increase");
  const quantitySpan = document.querySelector("#quantity");
  quantity(increaseBtn, decreaseBtn, quantitySpan);

  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      size = btn.textContent;
    });
  });

  addToCart.addEventListener("click", () => {
    console.log("Add to cart clicked");
    const productId = addToCart.dataset.productId;
    const addedProduct = products.find((product) => product.id == productId);
    const addedProductToCart = {
      id: addedProduct.id,
      title: addedProduct.title,
      price: addedProduct.price,
      image: addedProduct.image,
      quantity: quantitySpan.textContent,
      size: size,
      color: color,
    };
    addProductToCart(addedProductToCart);
    alert("Product added to cart");
  });
};

const renderTabReviews = (reviews, sliceNumber) => {
  const reviewsHTML = reviews
    .slice(0, sliceNumber)
    .map((review) => {
      let shortName;
      if (review.name) {
        let [firstName, lastName] = review.name.split(" ");
        shortName = lastName ? `${firstName} ${lastName[0]}.` : firstName;
      }
      return `
    <div class="tabReview">
      <span class="star">   ${getStars(review.rating)}</span>  
      <span class="reviewerName">   
        <img class="tik" src="./../images/tik.svg" alt="">
         ${shortName}
      </span> 
      <p class="tabreviewComment">${review.comment}</p>  
    </div>
 
  `;
    })
    .join("");

  uiElements.ratingReviews.innerHTML = ` ${reviewsHTML}`;
  const button = document.createElement("button");
  button.classList.add("viewAllReviews");
  reviews.length > sliceNumber
    ? (button.innerHTML = "Load More Reviews")
    : (button.innerHTML = "Hide Reviews");
  button.addEventListener("click", () => {
    if (button.innerHTML === "Load More Reviews") {
      uiElements.buttonContainer.innerHTML = "";
      renderTabReviews(reviews, reviews.length);
      button.innerHTML = "Hide Reviews";
    } else {
      uiElements.buttonContainer.innerHTML = "";
      renderTabReviews(reviews, 6);
      button.innerHTML = "Load More Reviews";
    }
  });
  uiElements.buttonContainer.appendChild(button);

  uiElements.ratingReviewsTitle.innerHTML = `
  <div class="ratingReviewstopContainer">
    <h2 class="tabratingReviewsTitle">All Reviews <span>(${reviews.length})</span></h2>
    <div class="reviewFilterContainer">
      <button class="filterBtn"><img src="./../images/icons/filterIcon.svg" alt="mm"></button>
      <button class="filterBtn">Latest <img src="./../images/icons/downArrow.svg" alt="nn"></button>
      <button class="filterBtn">Write a Review</button>
    </div>
  </div>
`;
};

const renderTabFaqs = (faqs) => {
  const faqsHTML = faqs
    .slice(0, 4)
    .map((faq, index) => {
      return `
        <div class="faq-item"> 
          <div class="faq-question" data-index="${index}">        
            <div class="faq-question-number">0${index + 1}</div>
            <div class="question-text">${faq.question}</div>
            <div class="arrow">+</div>
          </div>  
          <div class="faq-answer hidden">
            <div class="faq-answer-text">${faq.answer}</div>
          </div>
        </div>
      `;
    })
    .join("");

  uiElements.faqs.innerHTML = faqsHTML;

  const faqItems = uiElements.faqs.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const arrow = item.querySelector(".arrow");

    question.addEventListener("click", () => {
      const isOpen = !answer.classList.contains("hidden");

      faqItems.forEach((el) => {
        el.querySelector(".faq-answer").classList.add("hidden");
        el.querySelector(".arrow").textContent = "+";
        el.querySelector(".arrow").classList.remove("open");
      });

      if (!isOpen) {
        answer.classList.remove("hidden");
        arrow.classList.add("open");
        arrow.textContent = "×";
      }
    });
  });
};
const renderCart = () => {

  const cart = getFromStorage("cart");
  if(cart.length === 0){
    uiElements.cartContainerLeft.innerHTML = "<p>Cart is empty</p> <a href='homePage.html'>Continue Shopping</a>";
    uiElements.cartContainerLeft.classList.add("emtyCart");
    uiElements.cartContainerLeft.style.border = "none";
    uiElements.cartContainerRight.style.display = "none";
    return;
  }
  const cartHTML = cart
    .map((item) => {
      return `
        <div class="cart-item">
        
          <img class="cart-item-image" src="${item.image}" alt="${item.title}">
          <div class="cart-item-content">
            <h3 class="cart-item-title">${getShortTitle(item.title)}</h3>
            <p class="cart-item-price">size:${item.size}</p>
            <p class="cart-item-price">color:${item.color}</p>
            <p class="cart-item-price">${item.price}</p>


          </div>
 
<div class="removeContainer">
<svg data-product-id="${item.id}" class= "deleteIcon "  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z" fill="#FF3333"/>
</svg>
<div class="quantitySelector cartQuantitySelector">
  <button class="decrease2">-</button>
  <span class="quantity2">${item.quantity}</span>
  <button class="increase2">+</button>
</div>



</div> 
</div>
      `;
      
    })
    .join("");
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * 0.2;
    const delivery = 15; 
    const total = subtotal - discount + delivery;
    const increaseBtn2 = document.querySelectorAll(".increase2");
    const decreaseBtn2 = document.querySelectorAll(".decrease2");
    const quantitySpan2 = document.querySelectorAll(".quantity2"); 
  
    
    
    const cartRightHTML = `
    <div class="cartRightContainer">
      <h2 class="cartRightTitle">Order Summary</h2>
      <div class="cartRightContent">
        <div class="cartRightContentItem">
          <p class="cartRightContentItemTitle">Subtotal</p> <p class="cartRightContentItemPrice">$${subtotal.toFixed(2)}</p>
        </div>
        <div class="cartRightContentItem">
          <p class="cartRightContentItemTitle">Discount (-20%)</p> <p class="orange cartRightContentItemPrice">-${discount.toFixed(2)}</p>
        </div>
        <div class="cartRightContentItem">
          <p class="cartRightContentItemTitle">Delivery Fee</p> <p class="cartRightContentItemPrice">$${delivery}</p>
        </div>
        <div class="cartRightContentItem">
          <p class="cartRightContentItemTitle">Total</p> <p class="cartRightContentItemPrice">$${total.toFixed(2)}</p>
        </div>
        </div>
        <div class="couponContainer" >
          <input type="text" placeholder="Enter your coupon code">
          <button class="applyCoupon">Apply</button>
        </div>
        <button class="checkoutButton">Checkout</button>
      </div>
   
  `;
  
  uiElements.cartContainerRight.innerHTML = cartRightHTML;
  uiElements.cartContainerLeft.innerHTML = cartHTML;
  const deleteIcons = document.querySelectorAll(".deleteIcon");
  deleteIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const productId = icon.dataset.productId;
      console.log(productId);
      const product = cart.find(item => item.id === productId);
      getFromStorage("cart",product);
      removeFromCart(productId);
    });
  });
};
// Örnek ürünler
const products = [];
for (let i = 1; i <= 20; i++) {
  products.push("Product " + i);
}

const renderPagination = (products) => {
  const productsPerPage = 5;
  let currentPage = 1;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const showProducts = () => {
    uiElements.productList.innerHTML = "";
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;

    for (let i = start; i < end && i < products.length; i++) {
      const product = products[i];
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card-container-item" data-id="${product.id}">
        <img src="${product.image}" alt="${product.title}">
        <div class="itemContent">
          <h3>${getShortParagraph(product.title)}</h3>
          <p>$${product.price}</p>
          <span class="star">${getStars(product.rating.rate)}</span>
        </div>
      </div>
      `;
      uiElements.productList.appendChild(div);
    }
  };

  const updatePagination = () => {
    uiElements.paginationContainer.innerHTML = "";

    // Previous Button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        showProducts();
        updatePagination();
      }
    });
    uiElements.paginationContainer.appendChild(prevButton);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("pageNumber");
      if (i === currentPage) pageButton.classList.add("active");
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showProducts();
        updatePagination();
      });
      uiElements.paginationContainer.appendChild(pageButton);
    }

    // Next Button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        showProducts();
        updatePagination();
      }
    });
    uiElements.paginationContainer.appendChild(nextButton);
  };

  showProducts();
  updatePagination();
};



export {
  renderTabFaqs,
  renderTabReviews,
  renderProductDetail,
  renderRewiews,
  renderProducts,
  renderCart,
  renderPagination,
};
