var page = document.querySelector("body");
var mainNav = document.querySelector(".main-nav");
var mainNavToggle = document.querySelector(".main-nav__toggle");

// page.classList.add("js");
page.classList.remove("no-js");

mainNavToggle.addEventListener("click", function(e){
  e.preventDefault();

  if (mainNav.classList.contains("main-nav--closed")) {
    mainNav.classList.remove("main-nav--closed")
    mainNav.classList.add("main-nav--opened")
  } else {
    mainNav.classList.remove("main-nav--opened")
    mainNav.classList.add("main-nav--closed")
  }
});
