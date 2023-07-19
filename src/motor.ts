import {
    puntos,
    cartas
} from './modelo'

export const generarCartaAleatoria = (): number => {
    const indiceAleatorio = Math.floor(Math.random() * cartas.length)
    return cartas[indiceAleatorio]
}

export const calcularPuntuacion = (cartaAleatoria: number): void => {
    puntos.puntuacion += cartaAleatoria === 10 || cartaAleatoria === 11 || cartaAleatoria === 12 ? 0.5 : cartaAleatoria;
};

