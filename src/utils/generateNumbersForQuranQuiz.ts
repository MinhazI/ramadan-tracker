export default function generateNumbersForQuranQuiz(level: number): number[] {
    const numbers = new Set<number>();

    // Limit level to a maximum of 12
    const cappedLevel = Math.min(level, 12);

    // Calculate min and max dynamically based on level
    const minNumber = Math.max(1, 105 - (cappedLevel - 1) * 10);
    const maxNumber = Math.max(5, 114 - (cappedLevel - 1) * 10);

    while (numbers.size < 4) {
        const randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        numbers.add(randomNum);
    }

    return Array.from(numbers);
}
