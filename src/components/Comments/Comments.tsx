import { useState } from 'react';
import './Comments.css';
import useComments from './Comments.logic';

interface CommentsProps {
  recipeId: string;
}

const Comments: React.FC<CommentsProps> = ({recipeId}) => {

  const { handleCreateComment, commentRef, contextHolder, comments, handleViewReplies, handleReplyComment, replyRef } = useComments(recipeId);

  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  return (
    <div className="comments-container">
        <div className="comments-header">Comments</div>
        {comments.map(comment => (
          <div key={comment.id} className='main-comment-container'>
            <div className='comment-text'>{comment.content}</div>
            <div className='view-replies' onClick={handleViewReplies(comment.id)}>View replies</div>       
            <div className='reply-comment' onClick={()=> { setActiveReplyId(comment.id)}}>Reply</div>
            { activeReplyId === comment.id && (
              <div className='reply-input'>
                <form onSubmit={(e) => {handleReplyComment(e, comment.id); setActiveReplyId(null);}}>
                  <textarea ref={replyRef} placeholder='Write a reply...' rows={2} />
                  <button type='submit'>Submit</button>
                </form>
              </div>
            )}
          </div>
        ))}
        <div className='comment-container'>
            <div className='comment-user'>User1</div>
            <div className='comment-text'>Bu tarifi denedim, harika oldu!</div>
        </div>
        <>
            <form onSubmit={handleCreateComment} className='add-comment-container'>
                {contextHolder}
                <textarea ref={commentRef} placeholder="Add a comment..." rows={3} />
                <button type='submit' className="add-comment-button">Add Comment</button>
            </form>
        </>
    </div>
  )
}

export default Comments