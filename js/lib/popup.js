// Простой кастомный попап плагин
(function($){
  $.fn.popup = function(settings) {
    let defaults = {
      dynamic: false,
      closeBtn: true,
      overlay: false
    }

    let options = $.extend(defaults, settings);

    this.each(function(){
      this.elem = $(this);
      this.dynamic = options.dynamic;
      this.overlay = options.overlay;
      this.closeBtn = options.closeBtn ? this.elem.find('.modal__close') : false;
      this.titleElem = this.elem.find('.modal__title');
      this.bodyElem = this.elem.find('.modal__body');

      let popup = this;

      popup.open = function(content, title) {
        if (content) {
          popup.bodyElem.html(content);
        }

        if (title) {
          popup.titleElem.html(title);
        }

        if (!popup.elem.hasClass('modal--shown')) {
          popup.elem.addClass('modal--shown');
        }
      }

      popup.close = function() {
        if (popup.elem.hasClass('modal--shown')) {
          popup.elem.removeClass('modal--shown');
        }

        if (popup.dynamic) {
          popup.titleElem.empty();
          popup.bodyElem.empty();
        }
      }

      // Старт
      if (popup.closeBtn) {
        popup.closeBtn.on('click', popup.close);
      }

      if (popup.overlay) {
        popup.elem.on('click', function(evt) {
          if (evt.target === popup) {
            popup.close();
          }
        })
      }
    });

    return this;
  }
})(jQuery);
