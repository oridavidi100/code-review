export declare namespace Data {
  interface InitialState {
    user: User;
    codeBlocks: Codeblock[] | [];
    baseUrl: string;
  }
  interface Action {
    //  TOGGLE_DARKTHEME:
    type: string;
    payload: any;
  }
  interface User {
    userName: string;
    admin: boolean;
  }
  interface Codeblock {
    _id: string;
    name: string;
    title: string;
  }
}
