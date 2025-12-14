function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}

showMoreBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCertificates();
    })
});

function toggleCertificates() {
    certificates.classList.toggle('open');
}

function slidesToShow() {
    if (window.innerWidth >= 1920) {
        return 3
    }
    if (window.innerWidth >= 1280) {
        return 2
    }
    if (window.innerWidth < 1280) {
        return 1
    }
}

$(".slick-slider").slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow(),
    slidesToScroll: slidesToShow()
});

$(document).ready(function() {
    $(".questionsItem").click(function() {
      var $currentItem = $(this);
      var $otherItems = $(".questionsItem").not($currentItem);
      var $secondText = $currentItem.find(".secondText");

      if ($secondText.is(":hidden")) {
        // Закриваємо інші блоки
        $otherItems.find(".secondText").slideUp(300);
        $currentItem.removeClass("active"); // Видаляємо клас active у інших блоків
        $otherItems.css("max-height", "140px");

        // Відкриваємо поточний блок
        $secondText.slideDown(300);
        $otherItems.removeClass("active");
        $currentItem.addClass("active"); // Додаємо клас active до поточного блоку
        $currentItem.css("max-height", "300px");
      } else {
        // При закриванні видаляємо клас active у всіх блоків
        $currentItem.removeClass("active");
        $otherItems.css("max-height", "140px");
        $secondText.slideUp(300);
      }
    });
  });



