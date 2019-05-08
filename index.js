function createStore() {
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

  return {
    getState,
    subscribe
  }
}
