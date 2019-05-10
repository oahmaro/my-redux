import { combineReducers } from 'redux'

import todos from './todos'
import goals from './goals'
import loading from './loadings'

export default combineReducers({
  todos,
  goals,
  loading
})
