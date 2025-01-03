const btn = document.getElementById('btnAhorro');
const numeros = document.getElementById('numeros');
const ahorro = document.getElementById('numAhorro');
const ahorroAcumulado = document.getElementById('ahorroAcumulado');

if(localStorage.getItem('ahorro') === null || localStorage.getItem('numeros') === null){
    localStorage.setItem('ahorro', 0);
    localStorage.setItem('numeros', JSON.stringify(Array.from({length: 365}, (_, i) => i + 1)));
}
const arrayAhorros = JSON.parse(localStorage.getItem('numeros'));
let ahorroActual = JSON.parse(localStorage.getItem('ahorro'));

numeros.textContent = arrayAhorros.map(num => num.toString().padStart(3, '0')).join(' ');
ahorroAcumulado.textContent = ahorroActual;

function tomarRandomNum(){
    const randomIndex = Math.floor(Math.random() * arrayAhorros.length);
    return arrayAhorros[randomIndex];
}

function quitarNumFromPosibilidades(num){
    const index = arrayAhorros.indexOf(num);
    arrayAhorros.splice(index, 1);
}

btn.addEventListener('click', () =>{
    if(arrayAhorros.length === 0){
        btn.disabled = true;
        return;
    }
    const numRandom = tomarRandomNum();
    ahorroActual += numRandom;
    localStorage.setItem('ahorro', ahorroActual);
    quitarNumFromPosibilidades(numRandom);
    localStorage.setItem('numeros', JSON.stringify(arrayAhorros));
    ahorroAcumulado.textContent = ahorroActual;
    numeros.textContent = arrayAhorros.map(num => num.toString().padStart(3, '0')).join(' ');
    ahorro.children[0].textContent = numRandom.toString().padStart(3, '0');
});
