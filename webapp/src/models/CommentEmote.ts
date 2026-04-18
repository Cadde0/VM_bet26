// Comment/Emote model interface
type CommentEmote = {
  id: string;
  userId: string;
  matchId: string;
  content: string;
  type: "text" | "emoji";
  timestamp: string;
};

export default CommentEmote;
