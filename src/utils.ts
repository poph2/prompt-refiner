export const rand = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const randList = <T>(arr: T[], count: number): T[] => {
    count = count >= arr.length ? arr.length : count;
    const shuffledArray = arr.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
};


export const enum RandomType {
    RARE = 0.1,
    UNCOMMON = 0.25,
    COMMON = 0.5,
    FREQUENT = 0.75,
    VERY_FREQUENT = 0.9,
}

export const randomize = (type: RandomType): boolean => {
    return Math.random() < type;
};