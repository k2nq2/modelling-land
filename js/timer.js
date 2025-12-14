document.addEventListener('DOMContentLoaded', () => {

  const startDate = new Date(2025, 11, 15, 0, 0, 0); 
  const durationMs = 4 * 24 * 60 * 60 * 1000; 
  const endDate = new Date(startDate.getTime() + durationMs);


  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');

  const dLabel = document.getElementById('daysLabel');
  const hLabel = document.getElementById('hoursLabel');
  const mLabel = document.getElementById('minutesLabel');
  const sLabel = document.getElementById('secondsLabel');

  const pad = n => n.toString().padStart(2, '0');

  function plural(n, forms) {
    const n10 = n % 10;
    const n100 = n % 100;

    if (n100 >= 11 && n100 <= 14) return forms[2];
    if (n10 === 1) return forms[0];
    if (n10 >= 2 && n10 <= 4) return forms[1];
    return forms[2];
  }

  function update() {
    const now = new Date();


    if (now < startDate) {
      dEl.textContent = '04';
      hEl.textContent = '00';
      mEl.textContent = '00';
      sEl.textContent = '00';

      dLabel.textContent = 'дні';
      hLabel.textContent = 'години';
      mLabel.textContent = 'хвилини';
      sLabel.textContent = 'секунди';
      return;
    }

    let diff = Math.floor((endDate - now) / 1000);

    if (diff <= 0) {
      dEl.textContent = '00';
      hEl.textContent = '00';
      mEl.textContent = '00';
      sEl.textContent = '00';

      dLabel.textContent = 'днів';
      hLabel.textContent = 'годин';
      mLabel.textContent = 'хвилин';
      sLabel.textContent = 'секунд';
      return;
    }

    const days = Math.floor(diff / 86400);
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    dEl.textContent = pad(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(minutes);
    sEl.textContent = pad(seconds);

    dLabel.textContent = plural(days, ['день', 'дні', 'днів']);
    hLabel.textContent = plural(hours, ['година', 'години', 'годин']);
    mLabel.textContent = plural(minutes, ['хвилина', 'хвилини', 'хвилин']);
    sLabel.textContent = plural(seconds, ['секунда', 'секунди', 'секунд']);
  }

  update();
  setInterval(update, 1000);
});
