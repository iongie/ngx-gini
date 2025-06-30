interface ResultError {
    value: boolean;
    desc: InputError;
}

interface InputError {
    required?: boolean;
    email?: boolean;
    minlength?: InputLength;
    maxlength?: InputLength;
    pattern?: InputPattern
}

interface InputLength {
    actualLength: number;
    requiredLength: number
}

interface InputPattern {
    actualValue: string;
    requiredPattern: string;
}

export {
    type ResultError
}