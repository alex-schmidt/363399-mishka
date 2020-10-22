// Поддержка внешних SVG use
svg4everybody();

$(function() {
  $('body').toggleClass('no-js js');

  let $mainNav = $('.main-nav');

  $('.main-nav__toggle').on('click', function(evt) {
    evt.preventDefault();
    $mainNav.toggleClass('main-nav--closed main-nav--opened');
  });

  let addToCartPopup = $('.add-to-cart').popup({closeBtn: false, overlay: true})[0];
  let contactUsPopup = $('.contact-us').popup()[0];

  $('.js-add-to-cart-show').on('click', function(evt) {
    evt.preventDefault();
    addToCartPopup.open();
  });

  $('.js-contact-us-show').on('click', function(evt) {
    evt.preventDefault();
    contactUsPopup.open();
  });
})
