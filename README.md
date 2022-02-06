# Deploy Deploy React App with docker

#### Building (Development) Image and create container from that image

###### Directory Stracture

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


<br /> <br /> <br /> <br />

#### Building Production Ready Optimized Image: in very small size (10 times smaller)

###### Directory Stracture

```
├── Dockerfile 			: ...
├── Dockerfile.prod 		: This time we use this Dockerfile to build new optimized image
├── .dockerignore 		: ...
..... 				: Rest code is the same as previous only Dockerfile.prod added
```

###### /Dockerfile.prod

	# Stage-1: Build-Stage
	FROM node:16.13.2-alpine3.15 	AS build
	WORKDIR /app
	COPY package.json yarn.lock  ./
	RUN yarn install
	COPY . .
	RUN yarn run build

	# Stage-2: Production-Stage
	FROM nginx:1.21.6-alpine
	COPY --from=build /app/build /usr/share/nginx/html
	EXPOSE 80
	ENTRYPOINT ["nginx", "-g", "daemon off;"]



###### `yarn build`

	$ docker build -t react-app-prod -f Dockerfile.prod .
		. -t 		: add tat/label to image
		. -f | --file 	: To add Custom Dockerfile



	$ docker run -d --name react-app-prod -p 80:80  react-app-prod
	$ docker logs    react-app
	$ docker logs -f react-app



###### Test app on browser

(Browser) http://localhost:80 	=>  http://localhost


