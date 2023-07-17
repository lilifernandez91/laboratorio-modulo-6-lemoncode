import * as confetti from 'canvas-confetti';

const btnPideCarta = document.getElementById('dame')
const elementoPuntuacion = document.getElementById('puntuacion')
const elementoCarta = document.getElementById('carta')
const mensajes = document.getElementById('mensajes')
const mePlanto = document.getElementById('planto')
const comenzar = document.getElementById('comenzar')
const despuesDePlantarse = document.getElementById('despues-plantarse')

let puntuacion: number = 0

const cartas: Array<number> = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]

const imageSrc = '/images/{carta}-copas.jpg'
const backImageSrc = '/images/back.jpg'

const pideCarta = () => {
    const cartaAleatoria = generarCartaAleatoria()
    calcularPuntuacion(cartaAleatoria)
    muestraPuntuacion()
    muestraCarta(cartaAleatoria)
    gameOver()
    if (mensajes &&
        btnPideCarta &&
        btnPideCarta instanceof HTMLButtonElement &&
        puntuacion === 7.5 &&
        mePlanto &&
        mePlanto instanceof HTMLButtonElement) {
        mensajes.innerHTML = '¡Lo has clavado! ¡Enhorabuena!'
        confetti.default()
        btnPideCarta.disabled = true
        btnPideCarta.classList.add('disabled-btn')
        mePlanto.classList.add('disabled-btn')
        mePlanto.disabled = true
    }
}

const generarCartaAleatoria = (): number => {
    const indiceAleatorio = Math.floor(Math.random() * cartas.length)
    return cartas[indiceAleatorio]
}

const muestraCarta = (carta: number): void => {
    let imagen: string

    switch (carta) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 10:
        case 11:
        case 12:
            imagen = imageSrc.replace('{carta}', carta.toString())
            break
        default:
            imagen = backImageSrc
            break
    }
    if (elementoCarta) {
        elementoCarta.setAttribute('src', imagen)
    }
}

const muestraPuntuacion = (): void => {
    if (elementoPuntuacion) {
        elementoPuntuacion.innerHTML = puntuacion.toString()
    }
}

const calcularPuntuacion = (cartaAleatoria: number): void => {
    switch (cartaAleatoria) {
        case 10:
        case 11:
        case 12:
            puntuacion += 0.5
            break
        default:
            puntuacion += cartaAleatoria
            break
    }
}

const gameOver = (): void => {
    if (puntuacion > 7.5 &&
        mensajes &&
        btnPideCarta &&
        btnPideCarta instanceof HTMLButtonElement &&
        mePlanto &&
        mePlanto instanceof HTMLButtonElement) {
        mensajes.innerHTML = 'GAME OVER: LO SENTIMOS, LA PUNTUACION DEBE SER IGUAL O MENOR QUE 7.5'
        btnPideCarta.disabled = true
        btnPideCarta.classList.add('disabled-btn')
        mePlanto.classList.add('disabled-btn')
        mePlanto.disabled = true
    }
}

const handleMePlanto = (): void => {
    if (btnPideCarta && btnPideCarta instanceof HTMLButtonElement && mensajes && mePlanto && despuesDePlantarse) {
        btnPideCarta.disabled = true
        btnPideCarta.classList.add('disabled-btn')
        mePlanto.classList.add('disabled-btn')
        despuesDePlantarse.classList.remove('despues-de-plantarse')
        if (puntuacion === 0) {
            mensajes.innerHTML = 'Por favor, pide una carta'
            btnPideCarta.disabled = false
            btnPideCarta.classList.remove('disabled-btn')
            mePlanto.classList.remove('disabled-btn')
            despuesDePlantarse.classList.add('despues-de-plantarse')
        }
    } if (mensajes) {
        if (puntuacion >= 0.5 && puntuacion < 4) {
            mensajes.innerHTML = 'Has sido muy conservador'
        } if (puntuacion >= 4 && puntuacion < 6) {
            mensajes.innerHTML = 'Te ha entrado el canguelo eh?'
        } if (puntuacion >= 6 && puntuacion < 7.5) {
            mensajes.innerHTML = 'Casi casi....'
        }
    }
}

const handleComenzar = (): void => {
    puntuacion = 0

    if (elementoPuntuacion &&
        elementoCarta &&
        btnPideCarta &&
        btnPideCarta instanceof HTMLButtonElement &&
        mensajes &&
        mePlanto instanceof HTMLButtonElement &&
        despuesDePlantarse) {
        elementoPuntuacion.innerHTML = puntuacion.toString()
        elementoCarta.setAttribute('src', backImageSrc)
        mensajes.innerHTML = ''
        btnPideCarta.disabled = false
        btnPideCarta.classList.remove('disabled-btn')
        mePlanto.classList.remove('disabled-btn')
        despuesDePlantarse.classList.add('despues-de-plantarse')
        mePlanto.disabled = false;
    }
}

const handledespuesDePlantarse = (): void => {
    if (despuesDePlantarse && btnPideCarta && btnPideCarta instanceof HTMLButtonElement && mensajes) {
        despuesDePlantarse.classList.remove('despues-de-plantarse')
        btnPideCarta.disabled = false
        btnPideCarta.classList.remove('disabled-btn')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (mePlanto && btnPideCarta && comenzar && despuesDePlantarse) {
        mePlanto.addEventListener('click', handleMePlanto)
        btnPideCarta.addEventListener('click', pideCarta)
        comenzar.addEventListener('click', handleComenzar)
        despuesDePlantarse.addEventListener('click', handledespuesDePlantarse)
    }
})



