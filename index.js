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
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id)
    default:
      return state
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app)

store.subscribe(() => console.log('The new state is: ', store.getState()))

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true
  }
})

store.dispatch({
  type: REMOVE_TODO,
  id: 1
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
})
