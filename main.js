//Inicializacion de variables
let cardsShowed = 0;
let moves = 0;
let aciertos = 0;
let card1, card2, firstResult, secondResult = null;
let timer = false;
let time = 30;
let inicialTimer = 30;
let countdownTimer = null;

//Apuntando al doc HTML
let showMoves = document.getElementById('movimientos');
let showAciertos = document.getElementById('aciertos');
let showTime = document.getElementById('t-restante');

//array de numeros ordenada
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//Desordenarlos
numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

//Funciones
function startTimer() {
    countdownTimer = setInterval(()=>{
        time--;
        showTime.innerHTML = `Tiempo: ${time} segundos`;
        if (time == 0) {
            clearInterval(countdownTimer);
            blockCards();
        }
    },1000);
}

function blockCards() {
    for (let i = 0; i < 16; i++) {
        let cardBlocked = document.getElementById(i);
        cardBlocked.innerHTML = numbers[i];
        cardBlocked.disabled = true;
    }
}

//Funcion Principal
function show(id) {
    
    if (timer == false) {
        startTimer();
        timer = true;
    }

    cardsShowed++;
    console.log(cardsShowed);

    if (cardsShowed == 1) {
        //Mostrar primer numero
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = firstResult;

        //Desabilitar primer boton
        card1.disabled = true;
    }else if (cardsShowed == 2) {
        //Mostrar segundo numero
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;

        //Desabilitar segundo boton
        card2.disabled = true;

        //Incrementar movimientos
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;

        if (firstResult == secondResult) {
            //Reiniciar tarjetas mostradas
            cardsShowed = 0;

            //Aumentar aciertos
            aciertos++;
            showAciertos.innerHTML = `Aciertos: ${aciertos}`;
            //😎😱🤯
            if (aciertos == 8) {
                clearInterval(countdownTimer);
                showAciertos.innerHTML = `Aciertos: ${aciertos} 😎`;
                showTime.innerHTML = `Fantastico! Solo tardaste ${inicialTimer - time} segundos`
                showMoves.innerHTML = `Aciertos: ${moves} 😱`;
            }
        }else{
            //Mostrar valores y volver a taparlos 
            setTimeout(()=>{
                card1.innerHTML = '';
                card2.innerHTML = '';
                card1.disabled = false;
                card2.disabled = false;
                cardsShowed = 0;
            },800);
        }
    }
}