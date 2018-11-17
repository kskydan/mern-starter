import callApi from '../../util/apiCaller';

// Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Actions
export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addComments (comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function updateComment (comment) {
  return {
    type: UPDATE_COMMENT,
    comment,
  };
}

export function deleteComment (cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

// Workers
export function addCommentRequest (comment) {
  return (dispatch) => {

    const { postId } = comment;

    const data = {
      comment: {
        postId: comment.postId,
        name: comment.name,
        content: comment.content,
      },
    };

    return (
      callApi(`posts/${postId}/comments`, 'post', data)
        .then(res => dispatch(addComment(res.comment)))
    );
  };
}

export function getCommentsRequest (postId) {
  return (dispatch) => {
    return callApi(`posts/${postId}/comments`)
    .then(res => dispatch(addComments(res.comments)));
  };
}

export function saveCommentRequest (comment) {
  return (dispatch) => {
    const { cuid } = comment;

    const data = {
      comment: {
        name: comment.name,
        content: comment.content,
      },
    };

    return (
      callApi(`comments/${cuid}`, 'put', data)
      .then(res => dispatch(updateComment(res.comment)))
    );
  };
}

export function deleteCommentRequest (cuid) {
  return (dispatch) => (
    callApi(`comments/${cuid}`, 'delete')
    .then(() => dispatch(deleteComment(cuid)))
  );
}
