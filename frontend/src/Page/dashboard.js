import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nextQuestion, resetQuestion, selectOption, logoutUser } from '../redux/actions';
import '../App.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if (!localStorage.getItem("userToken")){
      navigate("/login");
    }
  },[]);

  const { questions, currentQuestionIndex, isFinished } = useSelector((state) => state);
  const currentQuestion = questions ? questions[currentQuestionIndex] : "";

  console.log({ questions, currentQuestion })

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handleReset = () => {
    dispatch(resetQuestion());
  };

  const handleOptionChange = (option) => {
  console.log({ option })
    dispatch(selectOption(currentQuestion.id, option));
  };

  const totalQuestions = questions ? questions.length : 0;
  const correctAnswers = questions ? questions.filter(q => q.selectedOption === q.answer).length : "";

  async function logout(){
    try {
      dispatch(logoutUser());
      navigate("/login");
    } catch(err){
      console.log("err",err);
    }
  }
  return (
    <div>     
      <form className="form-container" >
        <button 
          type="submit" 
          onClick={()=>logout()} 
          className="logout-button"
        >
          Logout
        </button>
        { isFinished ? (
            <div> 
              <h2>Results</h2>
              <p>You answered {correctAnswers} out of {totalQuestions} questions correctly.</p>
            </div>       
        ) : (
          <div>
            <h3> {currentQuestion ? currentQuestion.question : ""} </h3>
            { currentQuestion ? currentQuestion.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={currentQuestion.selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </div>
            )) : ""}
            <button onClick={handleNext} disabled={!currentQuestion.selectedOption}>
              Next
            </button>
          </div>
        )}
        {isFinished && <button onClick={handleReset}>Restart</button>}
      </form>
    
    </div>
  );
};

export default Dashboard;
