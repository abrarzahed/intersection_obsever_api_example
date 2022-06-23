// "use strict";
const header = document.querySelector("header");
const sectionOne = document.querySelector(".home-intro");
const heightHeader = header.getBoundingClientRect().height;
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const images = document.querySelectorAll("[data-src]");

//|||||||||||||||||| Sticky navigation
const sectionOneOptions = {
  rootMargin: `-${heightHeader}px`,
};
const sectionOneObserver = new IntersectionObserver(function (entries) {
  {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) header.classList.add("nav-scrolled");
      else header.classList.remove("nav-scrolled");
    });
  }
}, sectionOneOptions);
sectionOneObserver.observe(sectionOne);

//|||||||||||||||||||||||||||| Fade in animation
const appearOptions = {
  threshold: 0.4,
};
const appearOnscrollObserver = new IntersectionObserver(function (
  entries,
  appearOnscrollObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove("appear");
      return;
    } else {
      entry.target.classList.add("appear");
    }
  });
},
appearOptions);

faders.forEach((el) => {
  appearOnscrollObserver.observe(el);
});

sliders.forEach((e) => {
  appearOnscrollObserver.observe(e);
});

// |||||||||||||||||||||||||||||||||  lazy loading images
const preloadImage = function (img) {
  const src = img.getAttribute("data-src");
  if (!src) return;
  img.src = src;
};
const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px 200px 0px",
};
const imageObserver = new IntersectionObserver(function (
  entries,
  imageObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imageObserver.unobserve(entry.target);
    }
  });
},
imageOptions);

images.forEach((image) => {
  imageObserver.observe(image);
});
