// Guess model interface
type Guess = {
  id: string;
  userId: string;
  matchId: number;
  predictedResult: string;
  timestamp: string;
};

export default Guess;
