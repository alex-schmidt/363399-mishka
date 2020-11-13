// Поддержка внешних SVG use
svg4everybody();

// jQuery
$(function() {
  $('body').toggleClass('no-js js');

// Константы
  const AJAX_ERROR = 'Совсем нет никаких данных :(';
  const SERVER_ERR_TITLE = 'Ошибка сервера';
  const SERVER_ERR_TEXT = 'Попробуйте повторить запрос позднее';

// RegEx валидация номера телефона
$.validator.addMethod('phone', function(value, element) {
  // allow any non-whitespace characters as the host part
  return this.optional( element ) || /^(\+\d{1,2})?( |-)?\d{3}( |-)?\d{3}( |-)?\d{2}( |-)?\d{2}$/.test( value );
}, 'Введите корректный номер телефона');

// Стандартные сообщения валидатора
  $.extend($.validator.messages, {
    required: 'Это обязательное поле',
    remote: 'Исправьте это поле',
    email: 'Введите корректный Email',
    url: 'Введите корректный URL',
    date: 'Введите корректную дату',
    dateISO: 'Введите корректную дату (ISO)',
    number: 'Введите корректное число',
    digits: 'Вводите только числа',
    creditcard: 'Введите корректный номер кредитной карты',
    equalTo: 'Введите то же значение снова',
    accept: 'Введите значение с допустимым расширением',
    maxlength: jQuery.validator.format('Введите не более {0} символов'),
    minlength: jQuery.validator.format('Введите по крайней мере {0} символов'),
    rangelength: jQuery.validator.format('Введите значение между {0} и {1} символов'),
    range: jQuery.validator.format('Введите значение между {0} и {1}'),
    max: jQuery.validator.format('Введите значение меньшее или равное {0}'),
    min: jQuery.validator.format('Введите значение большее или равное {0}')
  });

// DOM-элементы
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
      color: {
        required: true,
      },
      email: {
        email: true,
        minlength: 5
      },
      phone: {
        phone: true,
        minlength: 10,
        maxlength: 17
      }
    },
    messages: {
      color: 'Вы должны выбрать, по крайней мере, один цвет',
      firstname: 'Введите корректное Имя',
      lastname: 'Введите корректную Фамилию',
    },
    errorPlacement: function(error, element) {
      if (element.attr('name') == 'color') {
        error.appendTo('.order__part--color .form__field');
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: onOrderSubmit
  });

// Обработчики
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

// Функции-обработчики
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

  function onOrderSubmit(form) {
    let popupTitle, popupContent = '';

    $.ajax({
      type: 'POST',
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
