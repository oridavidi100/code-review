require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
console.log(process.env.MONGO_URL);

export default { MONGO_URL };
