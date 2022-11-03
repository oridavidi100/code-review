import { Socket } from 'socket.io';

export interface ServerToClientEvents {
  updateBack: ({ content }: updateBack) => void;
}

export interface ClientToServerEvents {
  update: ({ content, id }: update) => void;
}

export interface updateBack {
  content: string;
}
export interface update {
  content: string;
  id: string;
}

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents
  // InterServerEvents,
  // SocketData
>;
