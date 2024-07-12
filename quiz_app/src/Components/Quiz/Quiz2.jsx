import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { data as quizData } from '../../assets/data';

const Quiz2 = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizData[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [shuffledData, setShuffledData] = useState([]);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    reset();
  }, []);



  // Shuffle function using sort with random comparator

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("Correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add('Correct');
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === shuffledData.length - 1) {
        setResult(true);
        return;
      }
      setIndex(prevIndex => prevIndex + 1);
      setQuestion(shuffledData[index + 1]);
      setLock(false);
      optionArray.forEach(option => {
        option.current.classList.remove("Wrong");
        option.current.classList.remove("Correct");
      });
    }
  };

  const reset = () => {
    const shuffled = shuffleArray([...quizData]);
    setShuffledData(shuffled);
    setIndex(0);
    setQuestion(shuffled[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='container'>
      <h1 className='head'>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {shuffledData.length} questions</div>
        </>
      ) : (
        <>
          <h2>Your Scored {score} out of {shuffledData.length}</h2>
          {/* {score < 8 ? <span>Work Hard!!</span> : score < 13 ? <span>Great Work </span> : <span>Well Done</span>} */}
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz2;
