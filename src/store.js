export const SET_BREAK = 'SET_BREAK';
export const SET_SESSION = 'SET_SESSION';
export const RESET_CLOCK = 'RESET_CLOCK';

// init state
const initState = {
  breakLength: 300, // 5*60
  sessionLength: 1500, // 25*60
};

// actions
export const setBreakLength = (value) => ({ type: SET_BREAK, value });
export const setSessionLength = (value) => ({ type: SET_SESSION, value });
export const resetClock = () => ({ type: RESET_CLOCK, initState });

// reducers
export const clockReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_BREAK:
      return { ...state, breakLength: action.value };
    case SET_SESSION:
      return { ...state, sessionLength: action.value };
    case RESET_CLOCK:
      return { ...state, ...action.initState };
    default:
      return state;
  }
};
