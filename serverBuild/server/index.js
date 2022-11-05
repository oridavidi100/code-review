'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.server = exports.io = void 0;
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const config_1 = __importDefault(require('./config'));
const mongoose_1 = __importDefault(require('mongoose'));
const api_1 = __importDefault(require('./routes/api'));
const errorHandler_1 = __importDefault(require('./middleware/errorHandler'));
const { MONGO_URL } = config_1.default;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 5000;
const path_1 = __importDefault(require('path'));
//////////// sockeet ////////
const http = require('http');
const socket_io_1 = require('socket.io');
const socket_1 = require('./controller/socket');
const httpServer = http.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});
exports.io.on('connection', socket_1.onConnection);
//////////socket.//////////
if (MONGO_URL) {
  mongoose_1.default
    .connect(MONGO_URL) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB `);
    })
    .catch(error => {
      console.log('error connecting to MongoDB:', error.message);
    });
}
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.use(errorHandler_1.default);
app.use(
  express_1.default.static(path_1.default.resolve(__dirname, '../../client'))
);
app.get('*', function (request, response) {
  response.sendFile(
    path_1.default.resolve(__dirname, '../../client', 'index.html')
  );
});
exports.server = httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`appp listening at http://localhost:${process.env.PORT}`);
});
