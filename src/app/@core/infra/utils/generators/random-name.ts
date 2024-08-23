const firstNames = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava',
    'Isabella', 'Mason', 'Sophia', 'James', 'Charlotte',
    'Benjamin', 'Amelia', 'Lucas', 'Evelyn', 'Ethan',
    'Harper', 'Alexander', 'Ella', 'Henry', 'Grace',
    'Jacob', 'Chloe', 'Michael', 'Isla', 'Daniel',
    'Mia', 'Matthew', 'Zoe', 'Aiden', 'Lily',
    'William', 'Aria', 'Jack', 'Madison', 'Owen',
    'Emily', 'Jameson', 'Hannah', 'Elijah', 'Avery',
    'Ryan', 'Samantha', 'David', 'Nora', 'Andrew',
    'Scarlett', 'Joshua', 'Mila', 'Eli', 'Ella',
    'Nathan', 'Addison', 'Gabriel', 'Luna', 'Caleb',
    'Stella', 'Isaiah', 'Paisley', 'Adam', 'Riley'
];
const lastNames = [ 'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson' ];

export const getRandomName = (): string => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${ firstName } ${ lastName }`;
};