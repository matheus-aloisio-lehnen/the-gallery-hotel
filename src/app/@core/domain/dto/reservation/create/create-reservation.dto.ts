import { FormGroup } from "@angular/forms";
import { Guest } from "../../../model/guest";

export interface CreateReservationDto {
    startDate: string;
    endDate: string;
    roomNumber: number;
    guest: Guest;
    payment: {total: number}
}

export const createReservationDtoFactory = (reservationForm: FormGroup, personalDataForm: FormGroup, addressForm: FormGroup, paymentForm: FormGroup): CreateReservationDto => {
    return {
        startDate: reservationForm.get('startDate')?.value,
        endDate: reservationForm.get('endDate')?.value,
        roomNumber: reservationForm.get('roomNumber')?.value,
        guest: {
            personalData: {
                name: personalDataForm.get('name')?.value,
                documentNumber: personalDataForm.get('documentNumber')?.value,
                mobile: personalDataForm.get('mobile')?.value,
            },
            address: {
                zipCode: addressForm.get('zipCode')?.value,
                street: addressForm.get('street')?.value,
                number: addressForm.get('number')?.value,
                city: addressForm.get('city')?.value,
                uf: addressForm.get('uf')?.value,
            },
        },
        payment: {
            total: paymentForm.get('payment')?.value
        }
    }
}
