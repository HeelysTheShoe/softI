export function formatState (object){
    const initialState = {question: {
        questions: [
          "Tell me about yourself?",
          "What made you decide to get into tech?",
          "Have you ever had a project that had to change drastically while it was in progress? Tell me about it?",
          "Tell me about a major setback you’ve had, and how you handled it?",
          "Talk about a time where you had to make an important decision quickly?",
          "Have you ever had a deadline you were not able to meet, and how did you handle it?",
          "Talk about a time when you had to adapt to significant changes at work?",
          "Have you ever had to convince your team to do a job they were reluctant to do?",
          "Dicuss any positive contributions you've made to your previous organization, be as specific as possible with real world examples.",
        ],
        questionSet: [],
        isLoggedIn: 'Blah',
        isSessionStarted: false,
        user: {},
        currentQuestion: 0
      }};

    for (const key in object){
        if (key in initialState.question === true){
            initialState.question[key] = object[key];
        }else{
            return 'Invalid key in input'
        }
    }
    return initialState
}