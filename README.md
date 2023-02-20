# Home Library Service

## Downloading

```
git clone https://github.com/tokensm1x/nodejs2022Q4-service.git
```

## Installing NPM modules

```
npm install --legacy-peer-deps 
```

## Installing Docker

Install [Docker](https://docs.docker.com/engine/install/)

## Running application

Run Docker app, after application running enter in the terminal:

```
npm run start:docker
```

## Scanning for vulnerabilities

```
npm run docker:scan
```

## Downloading images from DockerHub

Nest app
```
docker pull tokensmix/nodejs2022q4-service:nest
```
Postgres
```
docker pull tokensmix/nodejs2022q4-service:postgres
```

## Port

Default port: 4000

## Swagger

http://localhost:4000/doc/

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.
