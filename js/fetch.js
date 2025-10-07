const API_URL = "https://fakestoreapi.com/products?";

 const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};


export {fetchProducts};


const fetchReviews = async () => {
    const response = await fetch("./db.json");
    const data = await response.json();
    return data.reviews;
  }
  
  export {fetchReviews};

  const fetchFaqs = async () => {
    const response = await fetch("./db.json");
    const data = await response.json();
    return data.faqs;
  }
  
  export {fetchFaqs};
