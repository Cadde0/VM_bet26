// Match model interface
type Match = {
  id: string;
  teams: [string, string];
  startTime: string;
  result?: string;
  status: "upcoming" | "completed" | "in-progress";
};

export default Match;
