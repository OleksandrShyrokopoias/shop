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
