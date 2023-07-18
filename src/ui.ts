import * as confetti from 'canvas-confetti';

import {
    imageSrc,
    backImageSrc,
    puntos
} from './modelo'

import {
    generarCartaAleatoria,
    calcularPuntuacion,
} from './motor'

const elementoPuntuacion = document.getElementById('puntuacion')
const elementoCarta = document.getElementById('carta')
const mensajes = document.getElementById('mensajes')
const btnPideCarta = document.getElementById('dame')
const comenzar = document.getElementById('comenzar')
const mePlanto = document.getElementById('planto')
const despuesDePlantarse = document.getElementById('despues-plantarse')

export const pideCarta = () => {
    const cartaAleatoria = generarCartaAleatoria()
    calcularPuntuacion(cartaAleatoria)
    muestraPuntuacion()
    muestraCarta(cartaAleatoria)
    gameOver()
    if (mensajes &&
        btnPideCarta &&
        btnPideCarta instanceof HTMLButtonElement &&
        puntos.puntuacion === 7.5 &&
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
        elementoPuntuacion.innerHTML = puntos.puntuacion.toString()
    }
}

export const handleMePlanto = (): void => {
    if (btnPideCarta && btnPideCarta instanceof HTMLButtonElement && mensajes && mePlanto && despuesDePlantarse) {
        btnPideCarta.disabled = true
        btnPideCarta.classList.add('disabled-btn')
        mePlanto.classList.add('disabled-btn')
        despuesDePlantarse.classList.remove('despues-de-plantarse')
        if (puntos.puntuacion === 0) {
            mensajes.innerHTML = 'Por favor, pide una carta'
            btnPideCarta.disabled = false
            btnPideCarta.classList.remove('disabled-btn')
            mePlanto.classList.remove('disabled-btn')
            despuesDePlantarse.classList.add('despues-de-plantarse')
        }
    } if (mensajes) {
        if (puntos.puntuacion >= 0.5 && puntos.puntuacion < 4) {
            mensajes.innerHTML = 'Has sido muy conservador'
        } if (puntos.puntuacion >= 4 && puntos.puntuacion < 6) {
            mensajes.innerHTML = 'Te ha entrado el canguelo eh?'
        } if (puntos.puntuacion >= 6 && puntos.puntuacion < 7.5) {
            mensajes.innerHTML = 'Casi casi....'
        }
    }
}

export const handleComenzar = (): void => {
    puntos.puntuacion = 0

    if (elementoPuntuacion &&
        elementoCarta &&
        btnPideCarta &&
        btnPideCarta instanceof HTMLButtonElement &&
        mensajes &&
        mePlanto instanceof HTMLButtonElement &&
        despuesDePlantarse) {
        elementoPuntuacion.innerHTML = puntos.puntuacion.toString()
        elementoCarta.setAttribute('src', backImageSrc)
        mensajes.innerHTML = ''
        btnPideCarta.disabled = false
        btnPideCarta.classList.remove('disabled-btn')
        mePlanto.classList.remove('disabled-btn')
        despuesDePlantarse.classList.add('despues-de-plantarse')
        mePlanto.disabled = false;
    }
}

export const handledespuesDePlantarse = (): void => {
    if (despuesDePlantarse && btnPideCarta && btnPideCarta instanceof HTMLButtonElement && mensajes) {
        despuesDePlantarse.classList.remove('despues-de-plantarse')
        btnPideCarta.disabled = false
        btnPideCarta.classList.remove('disabled-btn')
    }
}

export const gameOver = (): void => {
    if (puntos.puntuacion > 7.5 &&
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

if (mePlanto && btnPideCarta && comenzar && despuesDePlantarse) {
    mePlanto.addEventListener('click', handleMePlanto)
    btnPideCarta.addEventListener('click', pideCarta)
    comenzar.addEventListener('click', handleComenzar)
    despuesDePlantarse.addEventListener('click', handledespuesDePlantarse)
}

const iniciarPartida = () => {
    puntos.puntuacion = 0
}

document.addEventListener('DOMContentLoaded', iniciarPartida)

