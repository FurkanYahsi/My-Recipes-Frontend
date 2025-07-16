import useComments from './Comments.logic';
import './Comments.css';

interface CommentsProps {
  recipeId: string;
}

const Comments: React.FC<CommentsProps> = ({recipeId}) => {

  const { handleCreateComment, commentRef, contextHolder, comments, handleViewReplies, replyingTo, handleReplyClick } = useComments(recipeId);

  return (
    <div className="comments-container">
        <div className="comments-header">Comments</div>
        {comments.map(comment => (
          <div key={comment.id} className='main-comment-container'>
            <div className='comment-text'>{comment.content}</div>
            <div className='view-replies' onClick={handleViewReplies(comment.id)}>View replies</div>       
            <div className='reply-comment' onClick={()=> { handleReplyClick(comment.id)}}>Reply</div>
            { replyingTo === comment.id && (
              <div className='reply-input'>
                <form onSubmit={(e) => {handleCreateComment(e, comment.id);}}>
                  <textarea ref={commentRef} placeholder='Write a reply...' rows={2} />
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