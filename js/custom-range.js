document.addEventListener("DOMContentLoaded", () => {
  const btnFilterShow = document.getElementById("toggleFilter");
  const formFilter = document.querySelector("form.filter");
  btnFilterShow.classList.add("active");
  formFilter.classList.add("active");
  // const windowInnerWidth = window.innerWidth;
  
  const customRange = document.querySelectorAll(".custom-range");
  createRange(customRange);
  range(customRange);

  // if(windowInnerWidth=<991){
  //   const btnFilterShow = document.getElementById('toggleFilter')
  // }

  function onMousePosition(element, event) {
    const clientRect = element.getBoundingClientRect();
    if ("ontouchstart" in window) {
      return (x = Math.round(event.touches[0].clientX - clientRect.left));
    } else {
      return (x = Math.round(event.clientX - clientRect.left));
    }
  }

  function range(ranges) {
    ranges.forEach((range) => {
      function isMove(direction, bollean) {
        if (direction === "left") {
          isMoveLeft = bollean;
        }
        if (direction === "right") {
          isMoveRight = bollean;
        }
      }

      const track = range.querySelector(".track");
      const widthTrack = track.clientWidth;

      let isMoveLeft = false;
      let isMoveRight = false;
      let valueLeft = 0;
      let valueRight = widthTrack;
      console.log("widthTrack", widthTrack);

      const valueBetween = range.querySelector(".value-between");
      valueBetween.style.left = valueLeft + "px";
      valueBetween.style.right = widthTrack - valueRight + "px";

      const minRange = range.dataset.minRange;
      const maxRange = range.dataset.maxRange;
      const step = range.dataset.step;
      const widthStep = widthTrack / ((maxRange - minRange) / step);

      const outputLeft = range.querySelector(".oL");
      const outputRight = range.querySelector(".oR");

      const viewLeft = outputLeft.querySelector(".view");
      const viewRight = outputRight.querySelector(".view");

      outputLeft.style.left = valueLeft + "px";
      outputRight.style.right = widthTrack - valueRight + "px";

      viewLeft.append(`${minRange} мес.`);
      viewRight.append(`${maxRange} мес.`);

      if ("ontouchstart" in window) {
        outputLeft.addEventListener("touchstart", () => isMove("left", true));
        outputRight.addEventListener("touchstart", () => isMove("right", true));

        document.addEventListener("touchend", () => isMove("left", false));
        document.addEventListener("touchend", () => isMove("right", false));

        range.addEventListener("touchmove", (event) => {
          const position = onMousePosition(track, event);

          if (isMoveLeft) {
            valueLeft = position;
            if (
              valueLeft < 0 ||
              (valueLeft > valueRight - widthStep && valueLeft < widthStep)
            ) {
              valueLeft = 0;
              outputLeft.style.left = valueLeft + "px";
            } else if (valueLeft > valueRight - widthStep) {
              valueLeft = valueRight - widthStep;
              outputLeft.style.left = valueLeft + "px";
            } else {
              outputLeft.style.left = valueLeft + "px";
            }
            valueBetween.style.left = valueLeft + "px";
          }
          if (isMoveRight) {
            valueRight = position;
            if (valueRight > widthTrack) {
              valueRight = 0;
              outputRight.style.right = valueRight + "px";
              valueBetween.style.right = valueRight + "px";
            } else if (valueRight < valueLeft + widthStep) {
              valueRight = valueLeft + widthStep;
              outputLeft.style.right = widthTrack - valueRight + "px";
              valueBetween.style.right = widthTrack - valueRight + "px";
            } else {
              outputRight.style.right = widthTrack - valueRight + "px";
              valueBetween.style.right = widthTrack - valueRight + "px";
            }
          }
        });
      } else {
        outputLeft.addEventListener("mousedown", () => isMove("left", true));
        outputRight.addEventListener("mousedown", () => isMove("right", true));

        document.addEventListener("mouseup", () => isMove("left", false));
        document.addEventListener("mouseup", () => isMove("right", false));

        range.addEventListener("mousemove", (event) => {
          const position = onMousePosition(track, event);

          if (isMoveLeft) {
            valueLeft = position;

            if (
              valueLeft < 0
              // (valueLeft > valueRight - widthStep && valueLeft < widthStep)
            ) {
              valueLeft = 0;
              outputLeft.style.left = valueLeft + "px";
            } else if (valueLeft > valueRight - widthStep) {
              console.log("valueLeft", valueLeft);
              console.log("valueRight", valueRight);
              console.log("widthStep", widthStep);
              valueLeft = valueRight - widthStep;
              outputLeft.style.left = valueLeft + "px";
            } else {
              outputLeft.style.left = valueLeft + "px";
            }
            valueBetween.style.left = valueLeft + "px";
            console.log(valueLeft);
            // console.log(Math.round((valueLeft / widthStep) * 2));
          }
          if (isMoveRight) {
            valueRight = position;
            if (valueRight > widthTrack) {
              valueRight = 0;
              outputRight.style.right = valueRight + "px";
              valueBetween.style.right = valueRight + "px";
            } else if (valueRight < valueLeft + widthStep) {
              valueRight = valueLeft + widthStep;
              outputLeft.style.right = widthTrack - valueRight + "px";
              valueBetween.style.right = widthTrack - valueRight + "px";
            } else {
              outputRight.style.right = widthTrack - valueRight + "px";
              valueBetween.style.right = widthTrack - valueRight + "px";
            }
          }
        });
      }

      // console.log(valueRight / step);
    });
    //
    // console.log(widthTrack);
  }

  function createRange(ranges) {
    ranges.forEach((range) => {
      const track = document.createElement("div");
      const valueBetween = document.createElement("div");
      const outputLeft = document.createElement("div");
      const thumbLeft = document.createElement("div");
      const viewLeft = document.createElement("div");
      const outputRight = document.createElement("div");
      const thumbRight = document.createElement("div");
      const viewRight = document.createElement("div");

      track.classList.add("track");
      valueBetween.classList.add("value-between");
      outputLeft.classList.add("output", "oL");
      thumbLeft.classList.add("thumb");
      viewLeft.classList.add("view");
      outputRight.classList.add("output", "oR");
      thumbRight.classList.add("thumb");
      viewRight.classList.add("view");

      range.append(track);
      track.append(valueBetween);
      track.append(outputLeft);
      track.append(outputRight);

      outputLeft.append(thumbLeft);
      outputLeft.append(viewLeft);

      outputRight.append(thumbRight);
      outputRight.append(viewRight);
    });
  }
});
