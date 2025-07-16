import './Comments.css';
import useComments from './Comments.logic';

import { MdAccountCircle } from 'react-icons/md';
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { IconBaseProps } from 'react-icons';

const IconProfile = MdAccountCircle as React.FC<IconBaseProps>;
const IconComment = FaRegComment as React.FC<IconBaseProps>;
const HeartIconFilled = FaHeart  as React.FC<IconBaseProps>;
const HeartIcon = FaRegHeart as React.FC<IconBaseProps>;
const IconArrowDown = RiArrowDownSLine as React.FC<IconBaseProps>;

interface CommentsProps {
  recipeId: string;
}

const Comments: React.FC<CommentsProps> = ({recipeId}) => {

  const { handleCreateComment, commentRef, contextHolder, comments, handleViewReplies, replyingTo, handleReplyClick, handleLikeClick, whichCommentsRepliesWillBeViewed, replies } = useComments(recipeId);

  return (
    <div className="comments-container">
      <div className="comments-header">Comments</div>

      {comments.map(comment => (
        <div key={comment.id} className='main-comment-container'>
          <div className='commment'>
            <div className='comment-user-profile'><IconProfile/></div>
            <div className='comment-content'>
              <div className='user-info'>
                <div className='comment-user'>{comment.user_name} {comment.user_surname}</div>
                <div className='comment-username'>@{comment.username}</div>
              </div>
              <div className='comment-text'>{comment.content}</div>
              <div className='comment-actions'>
                <div className='reply-comment' onClick={() => handleReplyClick(comment.id)}><IconComment/>Reply</div>
                <div className='like-comment' onClick={() => handleLikeClick(comment.id)}>{comment.is_liked ? <HeartIconFilled/> : <HeartIcon/>}{comment.like_count}</div>
                <div className='view-replies' onClick={() => handleViewReplies(comment.id)}>View replies<IconArrowDown/></div>
              </div>
            </div>
          </div>
          {replyingTo === comment.id && (
            <div className='reply-input'>
              <form onSubmit={(e) => handleCreateComment(e, comment.id)}>
                <textarea ref={commentRef} placeholder='Write a reply...' rows={2} />
                <button type='submit'>Submit</button>
              </form>
            </div>
          )}

          {whichCommentsRepliesWillBeViewed?.includes(comment.id) && (
            <>
              {(replies[comment.id] || []).map(reply => (
                <div key={reply.id} className='comment-container'>
                  <div className='comment-user'>{reply.username}</div>
                  <div className='comment-text'>{reply.content}</div>
                </div>
              ))}
            </>
          )}
        </div>
      ))}

      <form onSubmit={handleCreateComment} className='add-comment-container'>
        {contextHolder}
        <textarea ref={commentRef} placeholder="Add a comment..." rows={3} />
        <button type='submit' className="add-comment-button">Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;