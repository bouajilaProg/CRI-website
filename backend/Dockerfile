FROM Node:alpine

# Create app directory
WORKDIR /app/front

# Install app dependencies
COPY package*.json ./

RUN npm install

# copy app data
COPY . .

# Expose port and start application
EXPOSE 4000

CMD ["npm", "start"]


