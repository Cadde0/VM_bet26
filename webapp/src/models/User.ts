// User model interface
type User = {
  id: string;
  name: string;
  passwordHash: string;
  points: number;
  registrationDate: string;
  profilePictureUrl?: string;
};

export default User;
