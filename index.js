// Rule #1: Only an event can change the state of the store.
// Rule #2: The function that returns the new state needs to be a pure function
// Rule #3:

// Pure Functions:
// 1.Return the same result if the same arguments are passed in
// 2. Depend solely on the arguments passed into them
// 3. Do not produce side effects

// Library Code
function createStore(reducer) {
  // The store should have four parts
  // 1. The State tree
  // 2. Getting the state
  // 3. Listen for changes on the state
  // 4. Updating the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// App Code
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }

  return state
}

const store = createStore(todos)

store.subscribe(() => console.log('The new state is: ', store.getState()))

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})
