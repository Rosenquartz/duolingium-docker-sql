export interface MultipleChoiceQuestion {
    itemId: string,
    type: string,
    native?: string,
    english?: string,
    choices: string[]
}