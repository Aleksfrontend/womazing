

/*
* HEADER fixed
*/

   $(function() {
    let header = $('.header-fix');
    let hederHeight = header.height(); // вычисляем высоту шапки
     
    $(window).scroll(function() {
      if($(this).scrollTop() > 1) {
       header.addClass('header_fixed');
       header.addClass('header-fix_bg');
       $('.offer-section').css({
          'paddingTop': hederHeight+'px' // делаем отступ у body, равный высоте шапки
       });
      } else {
       header.removeClass('header_fixed');
       header.removeClass('header-fix_bg');
       $('.offer-section').css({
        'paddingTop': 0 // удаляю отступ у body, равный высоте шапки
       })
      }
    });
   });

/**
 * Slider Offer
 */

 const slides = document.querySelectorAll('.slide-offer-text__item');
 const points = document.querySelectorAll('.point');
 const slideWrap = document.querySelectorAll('.slide-wrapper');
 const slidesImgOffer = document.querySelectorAll('.img-offer-slide');

 let index = 0;

 const activeSlide = n => {
    for(slide of slides) {
        slide.classList.add('d-none');
    }
    slides[n].classList.remove('d-none');
}

const activeSlideImgOffer = n => {
    for(slide of slidesImgOffer) {
        slide.classList.add('d-none');
    }
    slidesImgOffer[n].classList.remove('d-none');
}

const activePoint = n => {
    for(point of points) {
        point.classList.remove('active-offer-point');
    }
    points[n].classList.add('active-offer-point');
}

const preparePointsSlide = ind => {
    activeSlide(ind);
    activePoint(ind);
    activeSlideImgOffer(ind);
}

points.forEach((item, indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        preparePointsSlide(index);
    })
})

const nextSlide = () => {
    if(index == slides.length - 1) {
        index = 0;
        preparePointsSlide(index);
    } else {
        index++;
        preparePointsSlide(index);
    }
}

const interval = setInterval(nextSlide, 3500);

/**
 * Modal Offer
 */

 const btnOpen = document.getElementById('tel-icon');
 const btnClose = document.getElementById('closed-modal');
 const btnCloseThank = document.getElementById('closed-thank');
 const btnOrder = document.getElementById('modal-tel');
 const modalOrder = document.getElementById('modal-window');
 const modalThank = document.getElementById('modal-thank');
 const modal = document.getElementById('tel-wrapper');
 const overlay = document.getElementById('overlay');


btnOpen.addEventListener('click', () => {
   modal.classList.remove('d-none');
})

btnOrder.addEventListener('click', () => {
    modalOrder.classList.add('d-none');
    modalThank.classList.remove('d-none');
})

const closeModal = () => {
    modal.classList.add('d-none');
}

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
btnCloseThank.addEventListener('click', closeModal);


/**
 * Burger menu
 */

const btnBurg = document.getElementById('burger');
const burgerMenu = document.querySelector('.burger-menu');
const overlayBurg = document.getElementById('overlay-burg');

btnBurg.addEventListener('click', () => {
burgerMenu.classList.remove('d-none');
 })

 const closeBurgerMenu = () => {
    burgerMenu.classList.add('d-none');
}

overlayBurg.addEventListener('click', closeBurgerMenu);

/**
 * Slide Teams
 */

 const prev = document.getElementById('arrow-prev');
 const next = document.getElementById('arrow-next');
 const slidesTeam = document.querySelectorAll('.img-slide');
 const pointsTeam = document.querySelectorAll('.point-team');
 const slideWrapTeam = document.querySelectorAll('.image-wrapper');

 let indexTeam = 0;

 const activeSlideTeam = n => {
    for(slide of slidesTeam) {
        slide.classList.add('d-none');
    }
    slidesTeam[n].classList.remove('d-none');
}

const activePointTeam = n => {
    for(point of pointsTeam) {
        point.classList.remove('active-point_team');
    }
    pointsTeam[n].classList.add('active-point_team');
}

const preparePointsSlideTeam = ind => {
    activeSlideTeam(ind);
    activePointTeam(ind);
}

pointsTeam.forEach((item, indexDot) => {
    item.addEventListener('click', () => {
        indexTeam = indexDot;
        preparePointsSlideTeam(indexTeam);
    })
})

const nextSlideTeam = () => {
    if(indexTeam == slidesTeam.length - 1) {
        indexTeam = 0;
        preparePointsSlideTeam(indexTeam);
    } else {
        indexTeam++;
        preparePointsSlideTeam(indexTeam);
    }
}

const prevSlideTeam = () => {
    if(indexTeam == 0) {
        indexTeam = slides.length - 1;
        preparePointsSlideTeam(indexTeam);
    } else {
        indexTeam--;
        preparePointsSlideTeam(indexTeam);
    }
}

next.addEventListener('click', nextSlideTeam);
prev.addEventListener('click', prevSlideTeam);

const intervalTeam = setInterval(nextSlideTeam, 3500);




/*Validate and dispatch*/

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })

    $.validator.addMethod('regex', function (value, element, regexp) {
      let regExsp = new RegExp(regexp);
      return this.optional(element) || /^[+-]?\d+$/.test(value) || regExsp.test(value);
    },
    'Please check your input.'
    );

    $('.form-modal-order').validate({
      rules : {
        name : {
          required : true,
          regex : "[A-Za-zА-Яа-я]{1,20}"
        },
        email : {
          required : true,
          email : true,
          regex : /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i
        },
        tel : {
          required : true,
          regex : true
        }
      },
      messages : {
        name : 'Введите имя правильно',
        email : 'Введите email правильно',
        tel : 'Введите ваш номер правильно',
      },

      // Начинаем проверку id="" формы
      submitHandler: function(form) {
        // $('#preloader-active').fadeIn();
        let $form = $(form);
        let $formId = $(form).attr('id');
        switch ($formId) {
            // Если у формы id="form-modal-order" - делаем:
            case 'form-modal-order':
                $.ajax({
                        type: 'POST',
                        url: $form.attr('action'),
                        data: $form.serialize()
                    })
                    .done(function() {
                      console.log('Success');
                  })
                  .fail(function() {
                      console.log('Fail');
                  })
                  .always(function() {
                      console.log('Always');
                      setTimeout(function() {
                          $('#message-for-online').fadeIn();
                          $form.trigger('reset');
                      }, 1100);
                      $('#message-for-online').on('click', function(e) {
                          $(this).fadeOut();
                      });
                  });
                break;
        }
        return false;
    }
  })
})

