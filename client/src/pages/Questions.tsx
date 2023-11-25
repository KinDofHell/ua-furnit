import questionsStyles from "./Questions.module.scss";

import QuestionSection from "../components/ui/questions/QuestionSection";
import Button from "../components/ui/buttons/Button";
import { Key, useEffect, useState } from "react";
import { useDataStore } from "../hooks/useDataStore";

import { FurnitureType } from "../types/furnitureTypes";
import { useDebounce } from "../hooks/useDebounce";

const Questions = () => {
  const [word, setWord] = useState<string>("");
  const { questions, fetchQuestionsByWord } = useDataStore();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);
  const debouncedWord = useDebounce(word, 500);

  useEffect(() => {
    fetchQuestionsByWord(`/api/question/`).then((res) => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (debouncedWord) {
      setIsLoaded(false);
      fetchQuestionsByWord(`/api/question/find/${debouncedWord}`).then(
        (res) => {
          setIsLoaded(true);
          setFound(true);
        }
      );
    }
  }, [debouncedWord, fetchQuestionsByWord]);

  const refreshData = () => {
    fetchQuestionsByWord(`/api/question/`).then((res) => setIsLoaded(true));
    setFound(false);
    setWord("");
    const input = document.getElementById("questionSearch") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <main className={questionsStyles.mainPage}>
      <section className={questionsStyles.search}>
        <h3>Знайти за словом</h3>
        <input
          type="text"
          id="questionSearch"
          onChange={(e) => setWord(e.target.value)}
        />
        {found && <Button label="X" isDanger={true} onClick={refreshData} />}
      </section>
      <section className={questionsStyles.questions}>
        {isLoaded &&
          questions.map((obj: FurnitureType, index: Key) => (
            <QuestionSection
              question={obj.question}
              answer={obj.answer}
              key={index}
            />
          ))}
      </section>
    </main>
  );
};

export default Questions;
