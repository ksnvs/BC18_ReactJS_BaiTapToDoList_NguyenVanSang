const initialState = {};

export const toDoListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "first":
      return { ...state, ...payload };

    default:
      return { ...state };
  }
};
