// document.getElementById('phone').addEventListener('click', function () {
//     const div = this;
//     const phoneText = div.textContent.trim();
    
//     // Преобразуем в формат tel: без пробелов, скобок и дефисов
//     const telNumber = 'tel:' + phoneText.replace(/[^+\d]/g, '');

//     // Создаем ссылку <a>
//     const link = document.createElement('a');
//     link.href = telNumber;
//     link.textContent = phoneText;
//     link.style.textDecoration = 'none';
//     link.style.color = 'inherit';

//     // Заменяем div на ссылку
//     div.replaceWith(link);
// });

var swiper = new Swiper(".mySwiper", {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});

var swiperCompany = new Swiper(".companySwiper", {
      slidesPerView: 2,
      breakpoints: {
        480: {
          slidesPerView: 4,
        },
        991: {
          slidesPerView: 8,
        },
      },
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-right",
        prevEl: ".swiper-button-left",
      },
});

var swiperDiscounts = new Swiper(".discountsSwiper", {
      slidesPerView: 1,
      breakpoints: {
        400: {
          spaceBetween: 12,
          slidesPerView: 2,
        },
        600: {
          slidesPerView: 3,
        },
        785: {
          slidesPerView: 4,
        },
        1030: {
          slidesPerView: 5,
          spaceBetween: 23,
        },
      },
      navigation: {
        nextEl: ".swiper-discounts-button-right",
        prevEl: ".swiper-discounts-button-left",
      },
});

document.querySelectorAll('.filter__item-drop').forEach(function(item) {
  item.addEventListener('click', function() {
    this.classList.toggle('filter__item-drop--active');
    
    var nextElement = this.nextElementSibling;
    
    if (nextElement && nextElement.classList.contains('aside-filter__content')) {
      if (this.classList.contains('filter__item-drop--active')) {
        // Когда элемент активен, показываем его с анимацией
        nextElement.style.maxHeight = nextElement.scrollHeight + 'px';
      } else {
        // Когда элемент не активен, скрываем его
        nextElement.style.maxHeight = '0';
      }
    }
  });
});

const tabButtons = document.querySelectorAll('.product-card-tab-btn');
const tabContents = document.querySelectorAll('.product-card-tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;

        // убираем активные классы
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // добавляем активные классы
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

const headers = document.querySelectorAll('.accordion-header');

// FAQ аккорд

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        // закрываем остальные секции
        headers.forEach(item => {
            if (item !== header) {
                item.classList.remove('active');
                item.nextElementSibling.style.maxHeight = null;
            }
        });

        // открываем / закрываем текущую
        header.classList.toggle('active');

        if (header.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = null;
        }
    });
});



$('.filter-style').styler();

$(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 120,
      max: 1256,
});

