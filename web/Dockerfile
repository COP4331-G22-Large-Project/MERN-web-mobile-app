FROM node:current-slim

# Application directory
WORKDIR /app

# Copy all files into the container
COPY . .

# Build app
RUN npm ci
RUN npm run build

# Delete source files
RUN rm -rf src

# The application port to expose. On Heroku, this is ignored, but the app will use a provided port
EXPOSE 8000

RUN chmod +x ./start.sh

# The script to run the app
CMD npm run prod