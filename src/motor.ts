import {
    puntos,
    cartas
} from './modelo'

export const generarCartaAleatoria = (): number => {
    const indiceAleatorio = Math.floor(Math.random() * cartas.length)
    return cartas[indiceAleatorio]
}

export const calcularPuntuacion = (cartaAleatoria: number): void => {
    switch (cartaAleatoria) {
        case 10:
        case 11:
        case 12:
            puntos.puntuacion += 0.5
            break
        default:
            puntos.puntuacion += cartaAleatoria
            break
    }
}

