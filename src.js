const btn = document.getElementById('btnAhorro');
const numeros = document.getElementById('numeros');
const ahorro = document.getElementById('numAhorro');
const ahorroAcumulado = document.getElementById('ahorroAcumulado');
const btnReset = document.getElementById('btnReset');



if (localStorage.getItem('ahorro') === null || localStorage.getItem('numeros') === null) {
    localStorage.setItem('ahorro', 0);
    localStorage.setItem('numeros', JSON.stringify(Array.from({ length: 365 }, (_, i) => i + 1)));
}
ahorro.children[0].textContent = '000';
const arrayAhorros = JSON.parse(localStorage.getItem('numeros'));
let ahorroActual = JSON.parse(localStorage.getItem('ahorro'));

numeros.textContent = arrayAhorros.map(num => num.toString().padStart(3, '0')).join(' ');
ahorroAcumulado.textContent = ahorroActual;

if (localStorage.getItem('fecha') === new Date().toLocaleDateString() || arrayAhorros.length === 0) {
    btn.disabled = true;
}


function tomarRandomNum() {
    const randomIndex = Math.floor(Math.random() * arrayAhorros.length);
    return arrayAhorros[randomIndex];
}

function quitarNumFromPosibilidades(num) {
    const index = arrayAhorros.indexOf(num);
    arrayAhorros.splice(index, 1);
}

btn.addEventListener('click', () => {
    btn.disabled = true;
    const numRandom = tomarRandomNum();
    ahorroActual += numRandom;
    localStorage.setItem('ahorro', ahorroActual);
    quitarNumFromPosibilidades(numRandom);
    localStorage.setItem('numeros', JSON.stringify(arrayAhorros));
    localStorage.setItem('fecha', new Date().toLocaleDateString());

    let intervalId = setInterval(() => {
        ahorro.children[0].textContent = arrayAhorros[Math.floor(Math.random() * arrayAhorros.length)].toString().padStart(3, '0');
    }, 200);

    setTimeout(() => {
        clearInterval(intervalId);
        ahorro.children[0].textContent = numRandom.toString().padStart(3, '0');
        ahorroAcumulado.textContent = ahorroActual;
        numeros.textContent = arrayAhorros.map(num => num.toString().padStart(3, '0')).join(' ');
        //btn.disabled = false;
    }, 3000);

    if (localStorage.getItem('fecha') && localStorage.getItem('fecha') == new Date().toLocaleDateString()) {
        btn.disabled = true;
        return;
    }

});


btnReset.addEventListener('click', () => {
    localStorage.setItem('ahorro', 0);
    localStorage.setItem('numeros', JSON.stringify(Array.from({ length: 365 }, (_, i) => i + 1)));
    localStorage.removeItem('fecha');
    ahorro.children[0].textContent = '000';
    ahorroActual = 0;
    ahorroAcumulado.textContent = ahorroActual;
    btn.disabled = false;
    numeros.textContent = arrayAhorros.map(num => num.toString().padStart(3, '0')).join(' ');
});



