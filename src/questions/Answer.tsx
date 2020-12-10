
type AnswerType = "yes" | "no";

export interface Answer {
  readonly id: number;
  readonly answer?: AnswerType;
  readonly estimate?: number;
}
