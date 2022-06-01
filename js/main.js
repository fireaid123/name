"use strict"

// Код который помогает определить на каком устройстве открыта наша страница. С помощью этого кода пойму открыта страница на тачскрине или с помощью мыши ( ниже) //
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry () ||
         isMobile.iOS () ||
         isMobile.Opera () ||
         isMobile.Windows ());
   }
};
// Дальше мы делаем проверку. Если у нас одно из устройств, которое говорит нам о том, что это мобильное устройство, то есть тачскрин, тогда мы будем добавлять к нашему боди некий класс например '_touch', если же это обычный ПК то мы добавляем класс '_pc'.
if (isMobile.any()) {
   document.body.classList.add('_touch');
   // показывает подменю при клике. Для этого первым делом собираем в переменную все стрелочки, в данном случае у нас одна
   let menuArrows = document.querySelectorAll('.menu__arrow');
   // Далее делаем условие где проверяем есть ли у нас вообще такие ребята в массиве (проверяем длинну массива этой переменной)
   if (menuArrows.length > 0) {
      // Далее если мы прошли проверку и такие стрелочки у нас есть, мы запускаем цикл чтобы по всем им пробежаться
      for (let index = 0; index < menuArrows.length; index++) {
         // создаем константу с каждой из этих стрелочек в данной ситуации одна
         const menuArrow = menuArrows[index];
         // Далее мы с на каждую из них будем навешивать событие клик
         menuArrow.addEventListener("click", function(e) {
            // Что нам нужно сделать при клике на стрелочку? Самый простой вариант это просто навешать какой то класс непосредственно родителю нажатой стрелочки.
            menuArrow.parentElement.classList.toggle('_active');
         });
      }
   }
} else {
   document.body.classList.add('_pc');
}

// МЕНЮ БУРГЕР:

// Первым делом мы должн получить наш объект, нашу иконку бургер
// Создаем константы:
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
// Делаем навсякий случай проверку, есть ли у меня такой класс такой объект вообще)
if (iconMenu) {
   // Теперь создаем событие клик по иконке и делаем здесь такие вещи: обращаюсь к самой иконке iconMenu и добавляем либо убираем класс _active (класс _acive на иконке нужен чтобы анимировать иконку):
   iconMenu.addEventListener("click", function (e) {
      iconMenu.classList.toggle('_active');
   // Делаем для menuBody тоже что и для iconMenu:
      menuBody.classList.toggle('_active');
   // Запрещаем скроллить страницу при открытом меню: 
   // Обращаемся к body и убираем либо добавляем класс '_lock':
      document.body.classList.toggle('_lock');
   });
}







// ПРОКРУТКА ПРИ КЛИКЕ:

// Первым делом нам нужно собрать массив объектов, которые будут участововать в навигации, т.е. собрать массив ссылок у которых есть дата-атрибут 'data-goto'.
// создаем массив:
// С помощью querySelectorAll мы ищем не все объекты с классом меню линк а только те с классом меню линк у которых есть атрибут data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto');
// Сразу проверяем есть ли у нас чтонибудь из этого и если есть начинаем работу
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      // Вешаем событие клик только в этот раз отправимся сразу в функцию для разнообразия 
      menuLink.addEventListener("click", onMenuLinkClick);
   });
   // Создаем функцию
   function onMenuLinkClick(e) {
      // Здесь нам нужно получить объект на который мы кликаем, для этого создаем константу и получаем целевой объект, т.е. объект на который мы кликнули, фактически это будет сама ссылка
      const menuLink = e.target;
      // Далее нужно построить важное условие выглядит оно так:
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){ // Во первых нужно проверить заполнен ли этот дата атрибут "menuLink.dataset.goto" есть ли там внутри что-то. Во вторых обязательно проверить существует ли объект "document.querySelector(menuLink.dataset.goto)", на который ссылается данный дата-атрибут 
         // Далее мы получаем в константу сообственно сам этот "document.querySelector(menuLink.dataset.goto)" объект
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         // И следующим действием нам нужно высчитать положение этого объекта обязательно с учетом высоты шапки.
         // Создаем константу и с помощью getBoundingClientRect().top (top - так как хочу получить расстояние от вверха этого объекта) получаю его местоположение на странице в пикселях, также обязательно прибавляем кол-во прокрученных пикселей ( для этого используем такую встроенную переменную pageYOffset, Y - потому что по вертикали) и дальше отнимаю высоту шапки "- document.querySelector('header').offsetHeight", если этого не сделать то под шапкой останется какой-то контент, т.е. что-то не будет видно.
         const gotoBlockVlaue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         // // Пишем чтобы меню закрывалось после того как нажали на какую-нибудь страницу или раздел страницы:
         // // Если объект иконки меню содержит класс '_active', т.е. фактически означает что меню открыто, то в этот момент мы должны убрать классы которые мы добавляем при открытии меню :
         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }
         


         // Далее пишем код который заставит скролл прокрутиться к нужному месту
         window.scrollTo({ //Обращаемся к объекту window в данном случае к окну браузера  пишу scrollTo - функция которая занимается прокруткой
            top: gotoBlockVlaue, // Здесь указываем top, т.е. нужно прокрутиться сверху и указываем вот эту константу gotoBlockVlaue высчитанная кол-во положения секций
            behavior: "smooth" // Второй параметр указываем smooth чтобы прокрутка была плавной
         });
         e.preventDefault(); // Для того чтобы отключить работу ссылки чтобы она не переходила куда-нибудь а просто выполняла прокрутку
      }
   }
}