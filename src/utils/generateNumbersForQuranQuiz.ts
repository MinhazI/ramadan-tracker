export default function generateNumbersForQuranQuiz(): number[] {
    const numbers = new Set<number>();

    while (numbers.size < 4) {
        const randomNum = Math.floor(Math.random() * 15) + 100;
        numbers.add(randomNum);
    }

    return Array.from(numbers);
}