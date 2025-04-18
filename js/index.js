const coin = document.querySelector('#coin'),
dilutedFrames = [2, 3, 8, 10, 11, 13, 19],
finalFrames = [16, 6];

// the diluted frames prevent the coin from being smooth
// but are intentionally added back in at the end because
// they add suspense on which side will land
function nextFrame(target, frame, speed) {
  if (speed < 20 + target && dilutedFrames.includes(frame)) {
    nextFrame(target, frame + 1, speed);
  } else if (speed > 60 + target && finalFrames.includes(frame)) {
    coin.src = `https://res.cloudinary.com/the-oe-studio/image/upload/v1547059219/coin${frame}.png`;
    coin.classList.remove('spinning');
    coin.classList.add('finished');
  } else {
    coin.src = `https://res.cloudinary.com/the-oe-studio/image/upload/v1547059219/coin${frame}.png`;
    setTimeout(() => nextFrame(target, frame < 20 ? frame + 1 : 1, ++speed), speed);
  } //end if
} //end nextFrame()

function flipCoin() {
  const target = Math.floor(Math.random() * 50);

  coin.classList.add('spinning');
  nextFrame(target, 0, 0);
} //end flipCoin()

flipCoin();

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Устанавливаем стартовое время: 17 минут 53 секунды = 1073 секунды
let time = parseInt(getCookie('timer')) || 1073;

const timerElement = document.querySelector('.cyber-timer');
timerElement.textContent = formatTime(time);

const interval = setInterval(() => {
    if (time > 0) {
        time--; // Уменьшаем время
        setCookie('timer', time, 1); // Сохраняем время в куки
        timerElement.textContent = formatTime(time); // Обновляем отображение
    } else {
        clearInterval(interval); // Останавливаем таймер, когда время заканчивается
        timerElement.textContent = "00:00"; // Показываем 00:00
    }
}, 1000);