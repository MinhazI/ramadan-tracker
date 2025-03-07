interface CreateQuizOutput {
    question: string;
    options: {
        text: string;
        value: number;
    }[];
};

export interface iQuiz {
    data: CreateQuizOutput[];
    meta: {
        type: string;
        select: number[];
        amount: number;
    };
}