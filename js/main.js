// document.designMode = 'on'
const menuBtn = document.getElementById("menuButton");
const header = document.getElementById("header");
const popupMenu = document.getElementById("popupMenu");
const body = document.querySelector("body");
const popupButtons = document.querySelectorAll("[data-open-popup]");
const popups = document.querySelectorAll("[data-popup]");

popupButtons.forEach((button) => {
  button.addEventListener("click", () => togglePopup(button.dataset.openPopup));
});

function noScroll() {
  const bodyWidth = body.offsetWidth;
  const windowWidth = window.innerWidth;
  const scrollWidth = windowWidth - bodyWidth;
  body.classList.add("noscroll");
  body.style.paddingRight = scrollWidth + "px";
}

function closePopup(popup, popupContent, event) {
  if (event.target === event.currentTarget) {
    popup.classList.remove("animate__fadeIn");
    popupContent.classList.remove("animate__backInDown");
    popupContent.classList.add("animate__backOutDown");
    popup.classList.add("animate__fadeOut");
    setTimeout(() => {
      popupContent.classList.remove(
        "active",
        "animate__backOutDown",
        "complete"
      );
      popup.classList.remove("active", "animate__fadeOut");
      body.style.paddingRight = 0;
      body.classList.remove("noscroll");
    }, 300);
  }
}

function togglePopup(popupName) {
  const popup = [...popups].find((p) => p.dataset.popup === popupName);
  if (popup) {
    noScroll();
    const popupContent = popup.querySelector(".popup__content");
    const btnClose = popup.querySelector(".close__btn");
    popup.classList.add("active", "animate__fadeIn");

    btnClose.addEventListener("click", (e) =>
      closePopup(popup, popupContent, e)
    );
    popup.addEventListener("click", (e) => closePopup(popup, popupContent, e));
    setTimeout(() => {
      popupContent.classList.add("active", "animate__backInDown");
    }, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  menuBtn.addEventListener("click", (e) => {
    const target = e.currentTarget;
    target.classList.toggle("active");
    if (menuBtn.classList.contains("active")) {
      target.disabled = true;
      noScroll();
      popupMenu.classList.remove("animate__fadeOut");
      const heightHeader = header.clientHeight;
      popupMenu.style.top = heightHeader + "px";
      popupMenu.classList.add("active", "animate__fadeIn");
      target.disabled = false;
    } else {
      target.disabled = true;
      popupMenu.classList.remove("animate__fadeIn");
      popupMenu.classList.add("animate__fadeOut");
      setTimeout(() => {
        popupMenu.classList.remove("active");
        body.style.paddingRight = 0;
        body.classList.remove("noscroll");
        target.disabled = false;
      }, 500);
    }
  });

  const toggleFilterBtn = document.getElementById("toggleFilter");
  const filter = document.querySelector(".filter");

  toggleFilterBtn
    ? toggleFilterBtn.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
        filter.classList.toggle("active");
        console.log(filter);
      })
    : "";

  const togglePartitionBtn = document.getElementById("togglePartition");
  const partitionList = document.querySelector(".partition__list");

  togglePartitionBtn
    ? togglePartitionBtn.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
        partitionList.classList.toggle("active");
        console.log(partitionList);
      })
    : "";

  // toggle accordeon

  function toggleAccordion(e) {
    if (!this.classList.contains("active")) {
      this.classList.add("active");
    } else {
      e.composedPath().forEach((item) => {
        if (item?.classList?.contains("wrapper-button")) {
          this.classList.remove("active");
        }
        if (item?.classList?.contains("discount__item")) {
          return;
        }
      });
    }
  }

  const discountAccordion = document.getElementById("discount-accordion");
  if (discountAccordion) {
    const discountItem =
      discountAccordion.querySelectorAll("li.discount__item");

    discountItem.forEach((item) => {
      item.addEventListener("click", toggleAccordion);
    });
  }

  // tabs information-organization
  const partitions = document.querySelectorAll("li.partition__item");
  console.log(partitions);

  const tabs = document.querySelector(".tabs");
  const tabsPartition = document.querySelectorAll(".partition__item");
  const tabsContent = document.querySelectorAll(".tabs__content");

  if (tabs) {
    tabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("partition__item")) {
        const tabsPath = e.target.dataset.partitionPath;
        tabsPartition.forEach((el) => el.classList.remove("active"));
        document
          .querySelector(`[data-partition-path='${tabsPath}']`)
          .classList.add("active");
        tabsHandler(tabsPath);
        partitionList.classList.remove("active");
      }
    });
  }

  const tabsHandler = (path) => {
    tabsContent.forEach((el) => {
      el.classList.remove("active");
    });
    document.querySelector(`[id="${path}"]`).classList.add("active");
  };
});
