import * as actions from '../actions'
// import * as types from '../constants/ActionTypes'

const { SET_CURRENTPAGE } = type;

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.SET_CURRENTPAGE,
      text
    }
    expect(actions.setPage(text)).toEqual(expectedAction)
  })
})