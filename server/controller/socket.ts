import { io } from '../index';
import { SocketType } from '../@types/socket';
import { CodeBlock } from '../db/CodeBlock';

export const onConnection = (socket: SocketType) => {
  socket.on('update', async ({ content, id }) => {
    console.log(content, id);
    await CodeBlock.findOneAndUpdate({ _id: id }, { content: content });
    socket.broadcast.emit('updateBack', { content });
  });
  socket.on('disconnect', () => {});
};
