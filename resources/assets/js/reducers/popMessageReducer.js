const initial_state = window && window.pop_message? {
  ...window.pop_message,
  pop: true
} : {
  pop: false
};

export default function popMessage(state = initial_state, action) {
  switch(action.type) {
    case 'CLEAR_POP_MESSAGE':
      return {
        pop: false
      }
    break;
  }

  return state;
}