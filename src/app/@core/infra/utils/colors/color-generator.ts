export const generateColor = (name: string): string => {
    const hash = Array.from(name).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xFFFFFF, 0);
    const pastelColors = [
        'rgb(173, 216, 230)',
        'rgb(152, 251, 152)',
        'rgb(255, 182, 193)',
        'rgb(255, 200, 124)',
        'rgb(216, 191, 216)'
    ];
    const colorIndex = hash % pastelColors.length;
    return pastelColors[colorIndex];
}