function noScroll() {
  const bodyWidth = body.offsetWidth;
  const windowWidth = window.innerWidth;
  const scrollWidth = windowWidth - bodyWidth;
  body.classList.add("noscroll");
  body.style.paddingRight = scrollWidth + "px";
}

// function getElement(name, selector) {
//   let element = null;
//   switch (selector) {
//     case "#":
//       return (element = document.getElementById(name));
//     case ".":
//       return (element = document.getElementsByClassName(name));
//     default:
//       return (element = document.getElementsByTagName(name));
//   }
// }

// console.log("TEST", getElement("menuButton", "#"))

const menuBtn = document.getElementById("menuButton");
const header = document.getElementById("header");
const popupMenu = document.getElementById("popupMenu");
const body = document.querySelector("body");

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

const btnStartEducation = document.getElementById("btnStartEducation");

const popupStartEducation = getPopup("popupStartEducation");
btnStartEducation.addEventListener("click", () => {
  noScroll();
  const popupContent = popupStartEducation.querySelector(".popup__content");
  const btnClose = popupStartEducation.querySelector(".close__btn");

  popupStartEducation.classList.add("active", "animate__fadeIn");
  btnClose.addEventListener("click", () =>
    closePopup(popupStartEducation, popupContent)
  );
  popupStartEducation.addEventListener("click", () =>
    closePopup(popupStartEducation, popupContent)
  );

  setTimeout(() => {
    popupContent.classList.add("active", "animate__backInDown");
  }, 300);
});

function getPopup(id) {
  return document.querySelector(".popup#" + id);
}

function closePopup(popup, popupContent) {
  popup.classList.remove("animate__fadeIn");
  popupContent.classList.remove("animate__backInDown");
  popupContent.classList.add("animate__backOutDown");
  popup.classList.add("animate__fadeOut");
  setTimeout(() => {
    popupContent.classList.remove("active", "animate__backOutDown", 'complete');
    popup.classList.remove("active", "animate__fadeOut");
    body.style.paddingRight = 0;
    body.classList.remove("noscroll");
  }, 300);
}
