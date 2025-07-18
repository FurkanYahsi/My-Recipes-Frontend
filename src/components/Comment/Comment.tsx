import './Comment.css';
import useComment from './Comment.logic';

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

interface Comment {
    id: string;
    content: string;
    username: string;
    user_name: string;
    user_surname: string;

    created_at: string;
    parent_comment_id: string;
    root_comment_id: string | null;
    user_id: string;
    recipe_id: string;
    like_count: number;
    reply_count: number;
    is_liked: boolean;
}

interface CommentProps {
    comment: Comment;
    type: 'main' | 'reply';
    handleReplyClick: (id: string) => void;
    handleLikeClick: (id: string) => void;
    handleViewReplies: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({comment, type, handleReplyClick, handleLikeClick, handleViewReplies}) => {

    const { timeAgo } = useComment();

  return (
    <div className={type==='main' ? 'commment' : 'comment-container'}>
        <div className='comment-user-profile'><IconProfile/></div>
        <div className='comment-content'>
            <div className='user-info'>
                <div className='comment-user'>{comment.user_name} {comment.user_surname}</div>
                <div className='comment-username'>@{comment.username}</div>
                <div className='comment-date'>{timeAgo(comment.created_at)}</div>
            </div>
            {comment.content}
            <div className='comment-actions'>
                <div className='reply-comment' onClick={() => handleReplyClick(comment.id)}><IconComment/>Reply</div>
                <div className='like-comment' onClick={() => handleLikeClick(comment.id)}>{comment.is_liked ? <HeartIconFilled className='filled-heart'/> : <HeartIcon/>}{comment.like_count}</div>
                {(type === 'main' && comment.reply_count > 0) ? <div className='view-replies' onClick={() => handleViewReplies(comment.id)}>View replies<IconArrowDown/></div> : null}
            </div>
        </div>
    </div>          
  )
}

export default Comment
