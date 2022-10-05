document.addEventListener("DOMContentLoaded", () => {
  const headerWrapper = document.querySelector(".header__wrapper");
  const searchBlock = headerWrapper.querySelector("#searchBlock");
  // const searchCloseButton = headerWrapper.querySelector('#searchBlock')
  const searchButton = document.getElementById("searchButton");

  function searchHandler(e) {

    e.target.className.split(" ").forEach((element) => {
      if (element === "close__btn") {
        toggleSearch();
      }
    });
  }

  function toggleSearch() {
    if (!headerWrapper.classList.contains("search")) {
      headerWrapper.classList.add("search");
      searchBlock.classList.add("animate__fadeIn");
      searchBlock.addEventListener("click", searchHandler);
      console.log("Добавить");
    } else {
      searchBlock.removeEventListener("click", searchHandler);
      searchBlock.classList.remove("animate__fadeIn");
      searchBlock.classList.add("animate__fadeOut");

      setTimeout(() => {
        headerWrapper.classList.remove("search");
        searchBlock.classList.remove("animate__fadeOut");
      }, 300);

      console.log("Убрать");
    }
  }

  body.addEventListener("click", () => {
    // console.log('body');
  });

  searchButton.addEventListener("click", toggleSearch);
});
