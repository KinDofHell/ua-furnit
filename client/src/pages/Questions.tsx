import questionsStyles from "./Questions.module.scss";

import QuestionSection from "../components/ui/questions/QuestionSection";
import Button from "../components/ui/buttons/Button";
import { Key, useEffect, useState } from "react";
import { useDataStore } from "../hooks/useDataStore";

import { FurnitureType } from "../types/furnitureTypes";

const Questions = () => {
  const [word, setWord] = useState<string>("");
  const [found, setFound] = useState<boolean>(false);
  const { questions, fetchQuestionsByWord } = useDataStore();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestionsByWord(`/api/question/`).then((res) => setIsLoaded(true));
  }, []);

  const handleSearchOnClick = () => {
    if (word) {
      setIsLoaded(false);
      fetchQuestionsByWord(`/api/question/find/${word}`).then((res) => {
        setIsLoaded(true);
        setFound(true);
      });
    }
  };

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
        <Button
          label="Знайти"
          className={questionsStyles.btnFind}
          onClick={handleSearchOnClick}
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
        <QuestionSection
          question="fsdkfsldf sdkfsd sdfs kf sdfsdfksj, sdfkjsdf - fkjfsefkef? fsdkfsldf sdkfsd sdfs kf sdfsdfksj, sdfkjsdf - fkjfsefkef?"
          answer="sdkfjskdf, dfskdflsdf ssdk flsdfl ksdfsk, sdfksdflwlv jskdkskf fsdkfsldf sdkfsd sdfs kf sdfsdfksj, sdfkjsdf - fkjfsefkef?"
        />
        <QuestionSection
          question="fsdkfsldf sdkfsd sdfs kf sdfsdfksj, sdfkjsdf - fkjfsefkef? fsdkfsldf sdkfsd sdfs kf sdfsdfksj, sdfkjsdf - fkjfsefkef?"
          answer="sdkfjskdf, dfskdflsdf ssdk flsdfl ksdfsk, sdfksdflwlv jskdkskf fsdkfsldf sdkfsd sdfs kf sdfsdfksj, sdfkjsdf - fkjfsefkef?"
        />
      </section>
    </main>
  );
};

export default Questions;
