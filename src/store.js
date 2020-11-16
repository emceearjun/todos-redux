import { createStore } from "redux";

const initialState = [
  {
    id: 1,
    description: "First item",
    completed: true,
  },
];
let todoId = initialState.length;

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [
        ...state,
        {
          id: ++todoId,
          description: action.payload.description,
          completed: action.payload.completed
        },
      ];

    case ActionTypes.TOGGLE_TODO:
      const index = state.findIndex((todo) => {
        return todo.id == action.payload.id;
      });
      const newState = [...state];
      newState[index].completed = !newState[index].completed;
      return newState;
    default:
      return state;
  }
};

export const ActionTypes = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
};

export const Actions = {
  addTodo: (description) => ({
    type: ActionTypes.ADD_TODO,
    payload: {
      completed: false,
      description,
    },
  }),
  toggleTodo: (id) => ({
    type: ActionTypes.TOGGLE_TODO,
    payload: {
      id,
    },
  }),
};

export const store = createStore(todosReducer);
