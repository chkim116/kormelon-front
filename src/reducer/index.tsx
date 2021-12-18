interface Initial {
  showSider: boolean;
  user: {
    username: string;
    token: string;
    id: string;
    admin: boolean;
  };
}

export const initial: Initial = {
  showSider: false,
  user: {
    username: '',
    token: '',
    id: '',
    admin: false,
  },
};

export function reducer(state: Initial, action: any) {
  switch (action.type) {
    case 'SHOWING': {
      return { ...state, showSider: !state.showSider };
    }
    case 'AUTH': {
      return {
        ...state,
        user: {
          username: action.payload.username,
          token: action.payload.token,
          id: action.payload.id,
          admin: action.payload.admin,
        },
      };
    }
    default:
      return state;
  }
}
