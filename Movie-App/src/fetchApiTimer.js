let timer;

export function startFetchApiTimer(callback, delay) {
  timer = setInterval(callback, delay);
}

export function stopFetchApiTimer() {
  clearInterval(timer);
}

export function resetFetchApiTimer(callback, delay) {
  clearInterval(timer);
  timer = setInterval(callback, delay);
}