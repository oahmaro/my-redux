function createStore() {
  // The store should have four parts
  // 1. The State tree
  // 2. Getting the state
  // 3. Listen for changes on the state
  // 4. Updating the state

  let state

  const getState = () => state

  return {
    getState
  }
}
