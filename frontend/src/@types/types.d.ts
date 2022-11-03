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

///socket///

export interface ServerToClientEvents {
  updateBack: ({ content }: updateBack) => void;
  updateTitleBack: ({ title }: UpdateTitleBack) => void;
}

export interface ClientToServerEvents {
  update: ({ content, id }: update) => void;
  updateTitle: ({ title, id }: UpdateTitle) => void;
}

export interface UpdateTitleBack {
  title: string;
}

export interface UpdateTitle {
  title: string;
  id: string;
}

export interface updateBack {
  content: string;
}
export interface update {
  content: string;
  id: string;
}
