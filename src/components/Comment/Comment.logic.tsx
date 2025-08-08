const useComment = () => {

    function timeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);
    const weeks   = Math.floor(days / 7);
    const months  = Math.floor(days / 30);
    const years   = Math.floor(days / 365);

    if (years > 0)   return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0)  return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks > 0)   return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0)    return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0)   return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return "just now";
}

  return {
    timeAgo
  }
}

export default useComment
