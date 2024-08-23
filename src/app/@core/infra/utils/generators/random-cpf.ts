export const getRandomCpf = (): string => {
    const generateRandomDigits = (length: number): string => {
        let digits = '';
        for (let i = 0; i < length; i++) {
            digits += Math.floor(Math.random() * 10);
        }
        return digits;
    };

    const calculateDigit = (cpf: string): number => {
        let sum = 0;
        let weight = cpf.length + 1;

        for (let i = 0; i < cpf.length; i++) {
            sum += parseInt(cpf[i], 10) * weight--;
        }

        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    // Generate first 9 digits
    let cpfBase = generateRandomDigits(9);

    // Calculate first digit
    const firstDigit = calculateDigit(cpfBase);
    cpfBase += firstDigit;

    // Calculate second digit
    const secondDigit = calculateDigit(cpfBase);
    cpfBase += secondDigit;

    // Format CPF
    return cpfBase.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}