# Deploy Deploy React App with docker

#### Directory Stracture

```
├── Dockerfile 			: Used to build docker image then docker container
├── .dockerignore 		: do the same as .gitignore
│
├── public
│ ├── favicon.ico
│ ├── index.html
│ ├── manifest.json
│ └── robots.txt
│
├── src
│ ├── app.js
│ ├── index.js
│ ├── signupForm.js
│ └── util.js
│
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```


#### Building Image and create container from that image

###### /Dockerfile
	FROM node:16.13.2-alpine3.15
	RUN addgroup app && adduser -S -G app app
	RUN mkdir /app && chown app:app /app
	WORKDIR /app
	COPY package.json yarn.lock /
	RUN yarn install
	COPY . .
	EXPOSE 3000
	CMD ["yarn", "start"]



###### `yarn build`

	$ docker build -t react-app .
		. -t 		: Add a tag (name/label) to built image

		. Pick Dockerfile from current directory (default)
		. Pick Context (project files) from current directory too


	$ docker run -d --name react-app -p 3000:3000 -v .:/app react-app

		. -d 		: detach terminal from node command
		. --name 	: give a name to container instead of random name (optional)
		. -p 		: Bind host port 3000 with container port :3000 which EXPOSED in Dockerfile
		. -v 		: Bind host pwd dir with container /app dir which prepared in Dockerfile


		. -f 		: See the container's logs continuously on host's terminal, as react do


	$ docker logs -f react-app

		. -f 		: See the container's logs continuously on host's terminal, as react do



###### Test app on browser

(Browser) http://localhost:3000




