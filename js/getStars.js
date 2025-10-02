const getStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);      
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
  

    for (let i = 0; i < fullStars; i++) {
      stars.push("<i class='fa-solid fa-star'></i>");
    }
  
    if (halfStar) {
      stars.push("<i class='fa-solid fa-star-half-stroke'></i>");
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push("<i class='fa-regular fa-star'></i>");
    }
  
    return stars.join("");
  };
  
  export default getStars;
  