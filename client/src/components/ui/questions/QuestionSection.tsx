import questionSectionStyles from "./QuestionSection.module.scss";
import { FC, HTMLAttributes } from "react";

interface QuestionAnswerProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

interface QuestionSectionProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  answer: string;
}

const Question: FC<QuestionAnswerProps> = ({ text }) => {
  return (
    <article className={questionSectionStyles.question}>
      <h2>{text}</h2>
    </article>
  );
};
const Answer: FC<QuestionAnswerProps> = ({ text }) => {
  return (
    <article className={questionSectionStyles.answer}>
      <h2>{text}</h2>
    </article>
  );
};

const QuestionSection: FC<QuestionSectionProps> = ({ question, answer }) => {
  return (
    <section className={questionSectionStyles.questionSection}>
      <Question text={question} />
      <Answer text={answer} />
    </section>
  );
};

export default QuestionSection;