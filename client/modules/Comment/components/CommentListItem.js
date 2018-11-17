import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './CommentListItem.css';

export class CommentListItem extends Component {

  static propTypes = {
    comment: PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditable: false,
    };
  }

  onClickDelete = () => {
    const { onDelete, comment } = this.props;
    onDelete(comment.cuid);
  }

  onClickEdit = () => {
    this.setState({ isEditable: true });
  }

  onClickSave = () => {
    const { onSave, comment } = this.props;
    const contentRef = this.refs.content2;

    onSave({
      ...comment,
      content: contentRef.value,
    });

    this.setState({ isEditable: false });

  }

  onClickCancel = () => {
    this.setState({ isEditable: false });
  }

  renderContentForm () {
    const { content } = this.props.comment;
    const styleSave = `${styles['comment-buttons']} ${styles['comment-save-button']}`;
    const styleCancel = `${styles['comment-buttons']} ${styles['comment-cancel-button']}`;
    return (
      <div>
        <p className={styles['comment-desc']}>
          <textarea className={styles['form-content']} ref="content2" defaultValue={content} />
        </p>
        <p>
          <a className={styleSave} href="#" onClick={this.onClickSave}><FormattedMessage id="btnSaveComment" /></a>
          <a className={styleCancel} href="#" onClick={this.onClickCancel}><FormattedMessage id="btnCancelComment" /></a>
        </p>
      </div>

    );
  }

  renderContent () {
    const { content } = this.props.comment;
    return (
      <Fragment>
        <p className={styles['comment-desc']}>{content}</p>
        <p className={styles['comment-action']}>
          <a href="#" onClick={this.onClickDelete}><FormattedMessage id="btnDeleteComment" /></a>
          <a href="#" onClick={this.onClickEdit}><FormattedMessage id="btnEditComment" /></a>
        </p>
      </Fragment>
    );
  }

  render () {
    const { name } = this.props.comment;
    const { isEditable } = this.state;

    return (
      <div className={styles['single-comment']}>
        <p className={styles['author-name']}><FormattedMessage id="authorComment" /> {name}</p>
        {isEditable ? this.renderContentForm() : this.renderContent()}
      </div>
    );
  }
}

export default CommentListItem;
