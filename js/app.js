var page = document.querySelector("body");
var mainNav = document.querySelector(".main-nav");
var mainNavToggle = document.querySelector(".main-nav__toggle");
var modalAddToCart = document.querySelector(".add-to-cart");
var modalAddToCartShow = document.querySelector(".js-add-to-cart-show");

// Получение пути к цели события
function composedPath (el) {
    var path = [];

    while (el) {
        path.push(el);

        if (el.tagName === 'HTML') {
            path.push(document);
            path.push(window);
            return path;
       }

       el = el.parentElement;
    }
}

// page.classList.add("js");
page.classList.remove("no-js");

mainNavToggle.addEventListener("click", function(e){
  e.preventDefault();

  // Переключаем открытое/закрытое состояние навигации
  if (mainNav.classList.contains("main-nav--closed")) {
    mainNav.classList.remove("main-nav--closed")
    mainNav.classList.add("main-nav--opened")
  } else {
    mainNav.classList.remove("main-nav--opened")
    mainNav.classList.add("main-nav--closed")
  }
});

modalAddToCartShow.addEventListener("click", function(e) {
  e.preventDefault();

  if (!modalAddToCart.classList.contains("modal--shown")) {
    modalAddToCart.classList.add("modal--shown")
  }
})


page.addEventListener("click", function(e) {
  // Получение "пути клика" (цель и родители)
  var path = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target);;

  // Клик не на модальном окне Добавить в корзину
  if (path && !path.indexOf(modalAddToCart)) {
    // Прячем модальное окно Добавить в корзину
    if (modalAddToCart.classList.contains("modal--shown")) {
      modalAddToCart.classList.remove("modal--shown");
    }
  }
})
