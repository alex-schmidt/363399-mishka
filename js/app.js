// Поддержка внешних SVG use
svg4everybody();

$(function() {
  $('body').toggleClass('no-js js');

  const AJAX_ERROR = 'Совсем нет никаких данных :(';
  const SERVER_ERR_TITLE = 'Ошибка сервера';
  const SERVER_ERR_TEXT = 'Попробуйте повторить запрос позднее';

  let $mainNav = $('.main-nav');
  let contactUsPopup = $('.contact-us').popup()[0];
  let addToCartPopup = $('.add-to-cart').popup({closeBtn: false, overlay: true})[0];
  let infoPopup = $('.modal--info').popup({dynamic: true, closeBtn: false, overlay: true})[0];

  $('.reviews__slider').slick({
    accessibility: false,
    prevArrow: $('.reviews__btn--prev'),
    nextArrow: $('.reviews__btn--next'),
  });

  $('.order__form').validate({
    errorElement: 'span',
    errorClass: 'field-error',
    rules: {
      email: {
        email: true,
        minlength: 5
      }
    },
    messages: {
      firstname: "Введите Ваше Имя",
      lastname: "Введите Вашу Фамилию",
      phone: "Введите Ваш Телефон",
      email: {
        required: "Введите Ваш Email",
        minlength: "Поле должно быть более 5-ти символов",
        email: "Некорректно введен Email"
      }
    },
    submitHandler: function(form) {
      let popupTitle, popupContent = '';

      $.ajax({
        type: "POST",
        url: form.action,
        data: $(form).serialize(),
        success: function(data) {
          popupTitle = 'Ваш заказ отправлен';
          popupContent = data;

          form.reset();
        },
        error: function() {
          popupTitle = SERVER_ERR_TITLE;
          popupContent = SERVER_ERR_TEXT;
        },
        complete: function() {
          infoPopup.open(popupContent, popupTitle);
        }
      });
    }
  });

  $('.main-nav__toggle').on('click', function(evt) {
    evt.preventDefault();
    $mainNav.toggleClass('main-nav--closed main-nav--opened');
  });

  $('.reviews__btn').on('click', function() {
    $(this).blur();
  })

  $('.js-add-to-cart-show').on('click', function(evt) {
    evt.preventDefault();
    addToCartPopup.open();
  });

  $('.js-contact-us-show').on('click', function(evt) {
    evt.preventDefault();
    contactUsPopup.open();
  });

  $('.add-to-cart__form').on('submit', function(evt) {
    onPopupSubmit(evt, {
      response: '.add-to-cart__response',
      errorClass: 'add-to-cart__response--error'
    });
  });

  $('.contact-us__form').on('submit', function(evt) {
    onPopupSubmit(evt);
  });

  function onPopupSubmit(evt, settings) {
    evt.preventDefault();

    let defaults = {
      response: '.form__response',
      errorClass: 'form__response--error',
    }

    let options = $.extend(defaults, settings);
    let form = evt.target;
    let $form = $(evt.target);
    let $response = $form.find(options.response);
    let errorClass = options.errorClass;
    let popup = $form.parents('.modal')[0];

    $.post(form.action, $form.serialize())
      .always(function(data, textStatus) {
        if (data === AJAX_ERROR || textStatus === 'error') {
          $response.addClass(errorClass);
        } else {
          $response.removeClass(errorClass);

          setTimeout(function() {
            form.reset();
            $response.empty();
            popup.close();
          }, 3000);
        }

        if (typeof data === 'string') {
          $response.html(data);
        } else {
          $response.html(`${SERVER_ERR_TITLE}. ${SERVER_ERR_TEXT}`);
        }
      });
  }
});
