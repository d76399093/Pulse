$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron left solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron right solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
    });

    $('.catalog-item__back').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
    });

    // Modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow')

    });
    $('.moda1__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
    });
    $('.button_mini').on('click', function () {
        $('.overlay, #order').fadeIn('slow')
    });


    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Введите коректное имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Нам нужен ваш контактный адресс електроной почты",
                    email: "Ваш електроный адрес должен содержать '@' и доменое имя електроной почты"
                }
            }
        });
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+380 (999 -999-99-99)");

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");

            $('form').trigger('reset');
        })
        return false;
    });

    //Smooth scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    })
});