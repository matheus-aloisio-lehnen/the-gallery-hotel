import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cpf',
    standalone: true
})
export class CpfPipe implements PipeTransform {

    transform(value: string | null | undefined): string {
        if(!value) return '';
        // Remove caracteres não numéricos
        const cleanedValue = (value || '').replace(/\D/g, '');

        // Valida o comprimento do CPF
        if (cleanedValue.length !== 11) {
            return value; // Retorna o valor original se não tiver 11 dígitos
        }

        // Formata o CPF
        return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    }

}
