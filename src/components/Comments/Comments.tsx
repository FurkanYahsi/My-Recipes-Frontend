import './Comments.css';
import useComments from './Comments.logic';

interface CommentsProps {
  recipeId: string;
}

const Comments: React.FC<CommentsProps> = ({recipeId}) => {

    const { handleCreateComment, commentRef, contextHolder, comments } = useComments(recipeId);

  return (
    <div className="comments-container">
        <div className="comments-header">Comments</div>
        {comments.map(comment => (
          <div key={comment.id} className='main-comment-container'>{comment.content}</div>
        ))}
        <div className='comment-container'>
            <div className='comment-user'>User1</div>
            <div className='comment-text'>Bu tarifi denedim, harika oldu!</div>
        </div>
        <div className="add-comment-container">
            <form onSubmit={handleCreateComment} className='add-comment-container'>
                {contextHolder}
                <textarea ref={commentRef} placeholder="Add a comment..." rows={3} />
                <button type='submit' className="add-comment-button">Add Comment</button>
            </form>
        </div>
    </div>
  )
}

export default Comments
