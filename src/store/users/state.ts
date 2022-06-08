export interface UsersStateInterface {
  isAuthenticated: boolean;
  user: UserInterface;
  userId: string;
  token: string;
}

export interface UserInterface {
  name: string;
}

function state(): UsersStateInterface {
  return {
    isAuthenticated: false,
    user: { name: '' },
    userId: '',
    token: '',
  };
}

export default state;
