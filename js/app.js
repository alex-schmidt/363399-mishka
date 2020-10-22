// Поддержка внешних SVG use
svg4everybody();

$(function() {
  $('body').toggleClass('no-js js');

  let $mainNav = $('.main-nav');
  let addToCartPopup = $('.add-to-cart').popup({closeBtn: false, overlay: true})[0];
  let contactUsPopup = $('.contact-us').popup()[0];

  $('.main-nav__toggle').on('click', function(evt) {
    evt.preventDefault();
    $mainNav.toggleClass('main-nav--closed main-nav--opened');
  });

  $('.js-add-to-cart-show').on('click', function(evt) {
    evt.preventDefault();
    addToCartPopup.open();
  });

  $('.js-contact-us-show').on('click', function(evt) {
    evt.preventDefault();
    contactUsPopup.open();
  });

  $('.add-to-cart__form').on('submit', function(evt) {
    evt.preventDefault();

    let form = this;
    let $form = $(this);
    let $response = $form.find('.add-to-cart__response');
    let errorClass = 'add-to-cart__response--error';
    let popup = addToCartPopup;

    $.post(form.action, $form.serialize(), function(data){
      if (data === 'Совсем нет никаких данных :(') {
        $response.addClass(errorClass);
      } else {
        $response.removeClass(errorClass);

        setTimeout(function() {
          form.reset();
          $response.empty();
          popup.close();
        }, 2000);
      }

      $response.html(data);
    });
  });

  $('.contact-us__form').on('submit', function(evt) {
    evt.preventDefault();

    let form = this;
    let $form = $(this);
    let $response = $form.find('.form__response');
    let errorClass = 'form__response--error';
    let popup = contactUsPopup;

    $.post(form.action, $form.serialize(), function(data){
      if (data === 'Совсем нет никаких данных :(') {
        $response.addClass(errorClass);
      } else {
        $response.removeClass(errorClass);

        setTimeout(function() {
          form.reset();
          $response.empty();
          popup.close();
        }, 2000);
      }

      $response.html(data);
    });
  });
})
