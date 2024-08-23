import { CurrencyMaskConfig } from "ng2-currency-mask";

export const CNPJ_MASK = '00.000.000/0000-00';
export const CPF_MASK = '000.000.000-00';
export const ZIPCODE_MASK = '00000-000';
export const MOBILE_MASK = '(00) 00000-0000';

export const CURRENCY_MASK: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};
