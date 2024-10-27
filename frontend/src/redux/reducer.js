const initialState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    questions: [
      {
        id: 1,
        question: '1) Which of the following statement is valid to use a Node module http in a Node based application?',
        options: ['var http = require("http")', 'var http = import("http")', 'package http;', 'import http'],
        answer: 'var http = require("http")',
        selectedOption: null,
      },
      {
        id: 2,
        question: '2) Which of the following provides in-built events.',
        options: ['events', 'callback', 'throw', 'handler'],
        answer: 'events',
        selectedOption: null,
      },
      {
        id: 3,
        question: '3) Which of the following is not a valid HTTP method?',
        options: ['get', 'put', 'post', 'header'],
        answer: 'header',
        selectedOption: null,
      },
      {
        id: 4,
        question: '4) What function is used to fire an event?',
        options: ['emit', 'fire', 'calc', 'None of the above'],
        answer: 'None of the above',
        selectedOption: null,
      },
      {
        id: 5,
        question: '5) What is the full form of npm?',
        options: ['Node Project Manager', 'Node Package Manager', 'New Project Manager', 'New Package Manager'],
        answer: 'Node Package Manager',
        selectedOption: null,
      },
    ],
    currentQuestionIndex: 0,
    isFinished: false,
  };
  
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGIN':
        return { 
          ...state, 
          loading: false, 
          token: action.payload, 
          isAuthenticated: true 
        };
      case 'SELECT_OPTION':
        return {
          ...state,
          questions: state.questions.map((q) =>
            q.id === action.payload.id ? { ...q, selectedOption: action.payload.option } : q
          ),
        };
      case 'NEXT_QUESTION':
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          isFinished: state.currentQuestionIndex + 1 === state.questions.length,
        };
      case 'RESET_QUESTION':
        return initialState;
      case 'LOGOUT':
        return { 
          ...state, 
          token: null, 
          isAuthenticated: false 
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  