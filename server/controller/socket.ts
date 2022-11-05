import { io } from '../index';
import { SocketType } from '../@types/socket';
import { CodeBlock } from '../db/CodeBlock';

export const onConnection = (socket: SocketType) => {
  console.log('connected');
  socket.on('join', ({ room }) => {
    socket.join(room);
  });
  socket.on('update', async ({ content, id }) => {
    await CodeBlock.findOneAndUpdate({ _id: id }, { content: content });
    socket.to(id).emit('updateBack', { content });
  });
  socket.on('updateTitle', async ({ title, id }) => {
    await CodeBlock.findOneAndUpdate({ _id: id }, { title: title });
    socket.broadcast.to(id).emit('updateTitleBack', { title });
  });
  socket.on('correctAnswer', async () => {
    socket.broadcast.emit('correctAnswerBack');
  });

  socket.on('disconnect', () => {
    // socket.disconnect();
    console.log('disconnect');
  });
};
