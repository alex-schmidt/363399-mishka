var page = document.querySelector("body");
var modalAddToCart = document.querySelector(".add-to-cart");
var modalAddToCartShow = document.querySelectorAll(".js-add-to-cart-show");

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

for (var i = 0; i < modalAddToCartShow.length; i++) {
  modalAddToCartShow[i].addEventListener("click", function(e) {
    e.preventDefault();

    if (!modalAddToCart.classList.contains("modal--shown")) {
      modalAddToCart.classList.add("modal--shown")
    }
  })
}


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

// Поддержка внешних SVG use
svg4everybody();

$(function() {
  $('body').toggleClass('no-js js');

  let $mainNav = $('.main-nav');

  $('.main-nav__toggle').on('click', function(evt) {
    evt.preventDefault();
    $mainNav.toggleClass('main-nav--closed main-nav--opened');
  });
})
