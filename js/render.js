import { uiElements } from "./ui.js";
import getStars from "./getStars.js";
import quantity from "./quantity.js";
import { getShortTitle, getShortParagraph } from "./helper.js";
import { cart, addProductToCart } from "./localStorage.js";

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

  uiElements.imagesDiv.innerHTML = `   <img src="${product.image}" alt="">
   <img src="${product.image}" alt="">
    <img src="${product.image}" alt="">`;

  uiElements.productDetail.innerHTML = productHTML;

  const addToCart = document.querySelector("#addToCart");
  const colorButtons = document.querySelectorAll(
    ".productDetailContentColors button"
  );
  const decreaseBtn = document.querySelector(".decrease");
  const increaseBtn = document.querySelector(".increase");
  const quantitySpan = document.querySelector("#quantity");
  const productDetailImage = document.querySelector(".productDetailImage img");
  const sizeButtons = document.querySelectorAll(".sizeButton");
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      productDetailImage.style.backgroundColor = btn.dataset.color;
    });
  });

  quantity(increaseBtn, decreaseBtn, quantitySpan);

  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
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
  const faqsHTML = faqs.slice(0, 4)
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


export {
  renderTabFaqs,
  renderTabReviews,
  renderProductDetail,
  renderRewiews,
  renderProducts,
};
