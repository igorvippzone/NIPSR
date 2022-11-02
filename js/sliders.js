function navigation(slider) {
  let wrapper, dots, arrowLeft, arrowRight;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
    arrowMarkup(remove);
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft);
      removeElement(arrowRight);
      return;
    }
    arrowLeft = createDiv("arrow arrow--left");
    arrowLeft.addEventListener("click", () => slider.prev());
    arrowRight = createDiv("arrow arrow--right");
    arrowRight.addEventListener("click", () => slider.next());

    wrapper.appendChild(arrowLeft);
    wrapper.appendChild(arrowRight);
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots");

    const slideView = slider.options.slides.perView - 1;
    slider.track.details.slides.forEach((_e, idx, arr) => {
      // if (arr.length - slideView > idx) {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
      // }
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled");
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled");
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}

const directionList = document.getElementById("direction__list");
const teachersList = document.getElementById("teachers__list");
const diplomaCertificateList = document.getElementById(
  "diploma-certificate-slider"
);

if (document.documentElement.clientWidth < 576) {
  console.log("lol");
  if (diplomaCertificateList) {
    diplomaCertificateSlider = new KeenSlider(
      diplomaCertificateList,
      {
        loop: true,
        slides: { perView: 1},
      },
      [navigation]
    );
  }
}

if (directionList) {
  const directionSlider = new KeenSlider(
    directionList,
    {
      // loop: true,
      slides: { perView: 4, spacing: 30 },
      breakpoints: {
        "(max-width: 1199px)": {
          slides: { perView: 3, spacing: 30 },
        },
        "(max-width: 991px)": {
          slides: { perView: 2, spacing: 20 },
        },
        "(max-width: 575px)": {
          slides: { perView: 1, spacing: 20 },
        },
      },
    },
    [navigation]
  );
}

if (teachersList) {
  const teachersSlider = new KeenSlider(
    teachersList,
    {
      loop: true,
      slides: { perView: 2, spacing: 30 },
      breakpoints: {
        "(max-width: 991px)": {
          slides: { perView: 2, spacing: 20 },
        },
        "(max-width: 767px)": {
          slides: { perView: 1, spacing: 20 },
        },
        "(max-width: 575px)": {
          slides: { perView: 1, spacing: 20 },
        },
      },
    },
    [navigation]
  );
}
