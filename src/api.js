export const sendNumber = (number) => {
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(), Math.random() * 1000 + 500);
    });
}

export const verify = (code) => {
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(), Math.random() * 1000 + 500);
    });
}