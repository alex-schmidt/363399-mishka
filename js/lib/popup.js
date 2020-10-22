// Простой кастомный попап плагин
(function($){
  $.fn.popup = function(settings) {
    let defaults = {
      closeBtn: true,
      overlay: false
    }

    let options = $.extend(defaults, settings);

    this.each(function(){
      this.element = $(this);
      this.overlay = options.overlay;
      this.closeBtn = options.closeBtn ? $(this).find('.modal__close') : false;

      let popup = this;
      let $popup = $(this);

      popup.open = function() {
        if (!$popup.hasClass('modal--shown')) {
          $popup.addClass('modal--shown');
        }
      }

      popup.close = function() {
        if ($popup.hasClass('modal--shown')) {
          $popup.removeClass('modal--shown');
        }
      }

      // Старт
      if (popup.closeBtn) {
        popup.closeBtn.on('click', popup.close);
      }

      if (popup.overlay) {
        popup.element.on('click', function(evt) {
          if (evt.target === popup) {
            popup.close();
          }
        })
      }
    });

    return this;
  }
})(jQuery);
