import { fetchProducts } from "./fetch.js";
import { fetchReviews,fetchFaqs } from "./fetch.js";
import { uiElements } from "./ui.js";
import { renderProducts, renderRewiews,renderProductDetail ,renderTabReviews,renderTabFaqs,renderCart   } from "./render.js";
import { slider } from "./slider.js";
import {  tabClickHandler} from "./helper.js";

document.addEventListener("DOMContentLoaded", async () => {
  

  uiElements.closeBanner.addEventListener("click", () => {
    uiElements.banner.style.display = "none";
    uiElements.SosialIcons.forEach(element => {
      element.classList.remove("active");

    });
  });
    const reviews = await fetchReviews();
    const products = await fetchProducts();
    const faqs = await fetchFaqs();
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/homePage.html"
  ) {  
    
 

    renderProducts(products,uiElements.newArrivals,"New Arrivals",4);
    renderProducts(products, uiElements.topSelling, "Top Selling",8);
    slider()
    renderRewiews(reviews);


  } else if (window.location.pathname === "/categoryPage.html") {
  
  } else if (window.location.pathname === "/cart.html") {
    renderCart();
    
  } else if (window.location.pathname === "/productDetail.html") { 
    
   
    renderProductDetail(products)
    tabClickHandler(uiElements.tabButtons,uiElements.tabContents);
    renderProducts(products, uiElements.youMightAlsoLike, "You Might Also Like",12);
    renderTabReviews(reviews,6);
    renderTabFaqs(faqs); 
    
  }
});
