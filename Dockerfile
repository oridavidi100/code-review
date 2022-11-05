FROM node:14.18.0

WORKDIR /backEnd

# Add everything in the current directory to our image, in the 'app' folder.
COPY  package.json  ./ 
COPY tsconfig.json ./

# Install dependencies
RUN npm install 

# 
COPY . .

EXPOSE 5000

# Run our app.
CMD ["npm", "run","start"]