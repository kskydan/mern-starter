import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './CommentForm.css';

import { addCommentRequest } from '../CommentActions';

export class CommentForm extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  onAddComment = () => {
    const { addComment, postId } = this.props;

    const nameRef = this.refs.name;
    const contentRef = this.refs.content;

    if (nameRef.value && contentRef.value) {
      addComment({
        postId,
        name: nameRef.value,
        content: contentRef.value,
      });

      nameRef.value = contentRef.value = '';
    }

  }

  render () {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createComment" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={this.props.intl.messages.commentContent} className={styles['form-field']} ref="content" />
          <a className={styles['comment-save-button']} href="#" onClick={this.onAddComment}><FormattedMessage id="btnCreateComment" /></a>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state, props) {
  return ({
    postId: props.postId,
  });
}

function mapDispatchToProps (dispatch) {
  return ({
    addComment: bindActionCreators(addCommentRequest, dispatch),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CommentForm));

