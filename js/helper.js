const selectTab = (tabButtons, tabContents, clickedButton) => {
  
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));
  
    clickedButton.classList.add("active");
  
    const targetTab = clickedButton.getAttribute("data-tab");
    const targetContent = document.getElementById(targetTab);
    if (targetContent) targetContent.classList.add("active");
  };
  
  const tabClickHandler = (tabButtons, tabContents) => {
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        selectTab(tabButtons, tabContents, button);
      });
    });
  };
  
  export { selectTab, tabClickHandler };
  
const getShortTitle = (title) => {

  let shortTitle = [];
  shortTitle = title.split(" ");
  shortTitle = shortTitle
    .slice(shortTitle.length - 1, shortTitle.length)
    .join(" ");
  return shortTitle;
};
export { getShortTitle };
const getShortParagraph = (title, maxLength = 18) => {
  if (title.length <= maxLength) {
    return title; 
  }
  return title.slice(0, maxLength) + "..."; 
};

export { getShortParagraph };
