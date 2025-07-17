import './CommentsSection.css';
import useComments from './CommentsSection.logic';
import Comment from '../Comment/Comment';

import { IconBaseProps } from 'react-icons';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const IconArrowLeft = MdKeyboardDoubleArrowLeft as React.FC<IconBaseProps>;
const IconArrowRight = MdKeyboardDoubleArrowRight as React.FC<IconBaseProps>;

interface CommentsProps {
  recipeId: string;
}

const Comments: React.FC<CommentsProps> = ({recipeId}) => {

  const { 
    comments,
    replies,
    replyingTo,
    whichCommentsRepliesWillBeViewed,
    commentCount,
    commentRef,
    page,
    contextHolder,
    handleReplyClick,
    handleLikeClick,
    handleViewReplies,
    handleCreateComment,
    handleNextPage,
    handlePreviousPage
  } = useComments(recipeId);

  return (
    <div className="comments-container">
      <div className="comments-header">Comments</div>

      {comments.map(comment => (
        <div key={comment.id} className='main-comment-container'>
          <Comment
            type='main'
            comment={comment}
            handleReplyClick={handleReplyClick}
            handleLikeClick={handleLikeClick}
            handleViewReplies={handleViewReplies}
          />
          
          {replyingTo === comment.id && (
            <div className='reply-input'>
              <form onSubmit={(e) => handleCreateComment(e, comment.id)}>
                <textarea ref={commentRef} placeholder='Write a reply...' defaultValue={`@${comment.username} `}/>
                <button type='submit' className='add-reply-button'>Submit</button>
              </form>
            </div>
          )}

          {whichCommentsRepliesWillBeViewed?.includes(comment.id) && (
            <>
              {(replies[comment.id] || []).map(reply => (
                <Comment
                  key={reply.id}
                  type='reply'
                  comment={reply}
                  handleReplyClick={() => handleReplyClick(reply.id)}
                  handleLikeClick={(id) => handleLikeClick(id, 'reply', comment.id)}
                  handleViewReplies={() => handleViewReplies(reply.id)}
                />
              ))}
            </>
          )}
        </div>
      ))}

      <div className='pagination'>
        <button className={`previous-page${page === 1 ? ' cannot-click' : ''}`} onClick={handlePreviousPage}>
          <IconArrowLeft/>Previous
        </button>
        <span className='page-number'>Page {page} / {Math.max(1, Math.ceil(commentCount / 8))}</span>        
        <button className={`next-page${page === Math.max(1, Math.ceil(commentCount / 8)) ? ' cannot-click' : ''}`} onClick={handleNextPage}>
          Next<IconArrowRight/>
        </button>
      </div>

      <form onSubmit={handleCreateComment} className='add-comment-container'>
        {contextHolder}
        <textarea ref={commentRef} placeholder="Add a comment..." rows={3} />
        <button type='submit' className="add-comment-button">Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;