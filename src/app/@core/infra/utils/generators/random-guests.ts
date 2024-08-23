import { Guest } from "../../../domain/model/guest";
import { getRandomName } from "./random-name";
import { getRandomCpf } from "./random-cpf";
import { getRandomInt } from "./random-int";

export const generateRandomGuests = (): Guest[] => {
    return Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        personalData: {
            name: getRandomName(),
            documentNumber: getRandomCpf(),
            mobile: String(Math.random())
        }
    }));
}

export const getRandomGuest = (guests: Guest[]): Guest => {
    return guests[getRandomInt(0, guests.length - 1)];
}