export default function generateNumbersForQuranQuiz(level: number): number[] {
    const numbers = new Set<number>();
    let minNumber = 105; // Base range for level 1
    const maxNumber = 114; // Fixed upper limit

    if (level === 1) {
        minNumber = 105; // Level 1: 105 - 114
    } else if (level === 2) {
        minNumber = 95; // Level 2: 95 - 114
    } else if (level === 3) {
        minNumber = 85; // Level 3: 85 - 114
    } else if (level >= 4) {
        minNumber = Math.max(1, 105 - (level - 1) * 10); // Ensuring it doesn't go below 1
    }

    while (numbers.size < 4) {
        const randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        numbers.add(randomNum);
    }

    return Array.from(numbers);
}
