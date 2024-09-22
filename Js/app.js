let Titulo = document.title;

window.addEventListener('blur', () => {
    Titulo = document.title;
    document.title = "Flores Amarillas";
});

window.addEventListener('focus', () => {
    document.title = Titulo;
});

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

// Función para dibujar un pétalo
function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
    const Numero = scala;
    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, Numero);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
        const AnguloActual = i * AnguloIncrement;
        const currentRadius = Math.sin(AnguloActual) * RadioX;
        const PuntoY = Math.sin(AnguloActual) * currentRadius;
        const PuntoX = Math.cos(AnguloActual) * currentRadius;
        if (i === 0) {
            ctx.moveTo(PuntoX, PuntoY);
        } else {
            ctx.lineTo(PuntoX, PuntoY);
        }
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

// Función para dibujar un tallo
function DibujarTallo(x, y, altura) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + altura);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 8; // Grosor del tallo
    ctx.stroke();
}

// Función para dibujar una hoja en posición horizontal
function DibujarHoja(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 20, y - 20, x + 40, y); // Curva para la hoja
    ctx.quadraticCurveTo(x + 20, y + 20, x, y); // Cierra la hoja
    ctx.fillStyle = 'green';
    ctx.fill();
}

// Función para dibujar una flor con tallo y hojas
function DibujarFlorConTallo(x, y) {
    const NumeroPetalos = 8; // Número de pétalos
    const RadioXPetalo = 30; // Radio en X
    const florY = y - 50; // Ajusta la posición de la flor
    const talloY = y + 50; // Altura del tallo

    // Dibuja la flor
    DibujarFlorSinTallo(x, florY, NumeroPetalos, RadioXPetalo);

    // Dibuja el tallo
    DibujarTallo(x, florY + 20, 125); // Asegúrate de que el tallo empieza justo debajo de la flor

    // Dibuja hojas
    DibujarHoja(x - 40, talloY); // Hoja izquierda
    DibujarHoja(x , talloY); // Hoja derecha
}

// Función para dibujar la flor sin tallo
function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo) {
    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
    let contadorPetalos = 0;

    function dibujarSiguientePetalo() {
        if (contadorPetalos < NumeroPetalos) {
            const Angulo = contadorPetalos * AnguloIncrement;
            DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
            contadorPetalos++;
            setTimeout(dibujarSiguientePetalo, 100);
        } else {
            // Dibuja el centro de la flor
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }
    dibujarSiguientePetalo();
}

// Evento para cerrar el mensaje y dibujar la flor
document.getElementById("BotonCerrar").addEventListener('click', () => {
    document.querySelector(".cua").style.display = "none"; // Oculta el mensaje
    DibujarFlorConTallo(canvas.width / 2, canvas.height / 2); // Dibuja la flor en el centro
});
