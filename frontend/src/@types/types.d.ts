export declare namespace Data {
  interface InitialState {
    user: User;
  }
  interface Action {
    //  TOGGLE_DARKTHEME:
    type: string;
    payload: any;
  }
  interface User {
    userName: string;
    isAdmin: boolean;
  }
}
