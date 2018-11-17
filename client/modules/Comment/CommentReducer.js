import {
  ADD_COMMENT,
  ADD_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from './CommentActions';

// Initial State
const initialState = {
  data: [],
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        data: [action.comment, ...state.data],
      };

    case ADD_COMMENTS:
      return {
        data: action.comments,
      };

    case UPDATE_COMMENT:
      return {
        data: [],
      };

    case DELETE_COMMENT:
      return {
        data: state.data.filter(comment => comment.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all comments
export const getComments = state => state.comments.data;

// Get comment by cuid
export const getComment = (state, cuid) => state.comments.data.filter(comment => comment.cuid === cuid)[0];

// Export Reducer
export default CommentReducer;
