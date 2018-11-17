import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEqual } from 'lodash';


import CommentListItem from './CommentListItem';
import CommentForm from './CommentForm';

import {
  saveCommentRequest,
  deleteCommentRequest,
  getCommentsRequest,
} from '../CommentActions';

import { getPost } from '../../Post/PostReducer';

import styles from './CommentList.css';

export class CommentList extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    getComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.loadComments();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.comments, this.props.comments)) {
      this.loadComments();
    }
  }

  loadComments () {
    const { getComments, post } = this.props;
    getComments(post.cuid);
  }

  render () {

    const { deleteComment, saveComment, comments, post } = this.props;

    const listItems = comments.map((item) => (
      <CommentListItem
        key={item.cuid}
        comment={item}
        onDelete={(cuid) => deleteComment(cuid)}
        onSave={(data) => saveComment(data)}
      />
    ));

    return (
      <div className={styles['comment-list']}>
        {listItems}
        <CommentForm
          postId={post.cuid}
        />
      </div>
    );
  }
}

function mapStateToProps (state, props) {
  return ({
    post: getPost(state, props.postId),
    comments: state.comments.data,
  });
}

function mapDispatchToProps (dispatch) {
  return ({
    getComments: bindActionCreators(getCommentsRequest, dispatch),
    saveComment: bindActionCreators(saveCommentRequest, dispatch),
    deleteComment: bindActionCreators(deleteCommentRequest, dispatch),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
