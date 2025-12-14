// =========================
// FIXED BUTTON
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const fixedBtn = document.querySelector('.fixed-btn');
  if (!fixedBtn) return;

  const remToPx = rem =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

  const showAfter = remToPx(73.4);

  function checkScroll() {
    if (window.scrollY >= showAfter) {
      fixedBtn.classList.add('is-visible');
    } else {
      fixedBtn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
});


// =========================
// 👉 УНИВЕРСАЛЬНАЯ БЛОКИРОВКА VERTICAL SCROLL
// =========================
function lockVerticalScrollOnSwipe(element) {
  let startX = 0;
  let startY = 0;

  element.addEventListener(
    'touchstart',
    e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  element.addEventListener(
    'touchmove',
    e => {
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);

      // горизонтальный свайп → блокируем вертикаль
      if (dx > dy && dx > 5) {
        e.preventDefault();
      }
    },
    { passive: false } // ⚠️ обязательно
  );
}


// =========================
// FRAME / STICKS SLIDER
// =========================
const frames = document.querySelectorAll(".frame");
const btnPrev = document.getElementById("goPrev");
const btnNext = document.getElementById("goNext");
const track = document.querySelector(".track");

const framesCount = frames.length;
const sticksTotal = 21;
const offset = 6;

let current = 0;

// sticks
for (let i = 0; i < sticksTotal; i++) {
  const stick = document.createElement("div");
  stick.classList.add("stick");

  stick.dataset.index = i;
  stick.addEventListener("click", () => {
    const slideIndex = i - offset;
    if (slideIndex >= 0 && slideIndex < framesCount) {
      current = slideIndex;
      render();
    }
  });

  track.appendChild(stick);
}

const sticks = document.querySelectorAll(".stick");

function render() {
  frames.forEach(f => f.classList.remove("active"));
  frames[current].classList.add("active");

  sticks.forEach(s => s.classList.remove("active"));
  const activeStick = current + offset;
  if (sticks[activeStick]) sticks[activeStick].classList.add("active");
}

btnNext.addEventListener("click", () => {
  current = (current + 1) % framesCount;
  render();
});

btnPrev.addEventListener("click", () => {
  current = (current - 1 + framesCount) % framesCount;
  render();
});

// свайп
lockVerticalScrollOnSwipe(document);

let startX = 0;
let isDown = false;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isDown = true;
});

document.addEventListener("touchmove", e => {
  if (!isDown) return;
  const diff = e.touches[0].clientX - startX;

  if (Math.abs(diff) > 50) {
    current = diff < 0
      ? (current + 1) % framesCount
      : (current - 1 + framesCount) % framesCount;
    render();
    isDown = false;
  }
});

document.addEventListener("touchend", () => {
  isDown = false;
});

render();


// =========================
// SLIDER-WRAPPER
// =========================
document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
  const slides = wrapper.querySelector('.slides');
  const slide = wrapper.querySelectorAll('.slide');
  const nextBtn = wrapper.querySelector('.next');
  const prevBtn = wrapper.querySelector('.prev');

  let index = 0;
  const slideCount = slide.length;

  slides.style.width = `${slideCount * 100}%`;
  slide.forEach(sl => {
    sl.style.width = `${100 / slideCount}%`;
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slideCount;
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slideCount) % slideCount;
    updateSlide();
  });

  function updateSlide() {
    slides.style.transform = `translateX(${-index * (100 / slideCount)}%)`;
  }

  // свайп
  lockVerticalScrollOnSwipe(slides);

  let startX = 0;
  let endX = 0;

  slides.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  slides.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });

  slides.addEventListener('touchend', () => {
    const diffX = endX - startX;
    if (Math.abs(diffX) > 50) {
      index = diffX < 0
        ? (index + 1) % slideCount
        : (index - 1 + slideCount) % slideCount;
      updateSlide();
    }
  });
});


// =========================
// PEEK SLIDER
// =========================
document.querySelectorAll('.peek-shell').forEach(shell => {
  const track = shell.querySelector('.peek-track');
  const cards = shell.querySelectorAll('.peek-card');
  const nextBtn = shell.querySelector('.peek-next');
  const prevBtn = shell.querySelector('.peek-prev');

  let index = 0;
  const gap = 10;

  function update() {
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (index < cards.length - 1) {
      index++;
      update();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      update();
    }
  });

  // свайп
  lockVerticalScrollOnSwipe(track);

  let startX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && index < cards.length - 1) index++;
      if (diff > 0 && index > 0) index--;
      update();
    }
  });

  update();
});
