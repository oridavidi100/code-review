import { io } from '../index';
import { SocketType } from '../@types/socket';
import { CodeBlock } from '../db/CodeBlock';

export const onConnection = (socket: SocketType) => {
  socket.on('update', async ({ content, id }) => {
    await CodeBlock.findOneAndUpdate({ _id: id }, { content: content });
    socket.broadcast.emit('updateBack', { content });
  });
  socket.on('updateTitle', async ({ title, id }) => {
    await CodeBlock.findOneAndUpdate({ _id: id }, { title: title });
    socket.broadcast.emit('updateTitleBack', { title });
  });
  socket.on('correctAnswer', async () => {
    socket.broadcast.emit('correctAnswerBack');
  });

  socket.on('disconnect', () => {});
};
