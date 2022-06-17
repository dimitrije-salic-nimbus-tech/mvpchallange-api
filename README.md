## Prerequisite:

- node
- nvm
- npm / yarn

## How to run application:

- Inside your favorite shell enter

```
$ nvm use
```

This command will trigger nvm to read node version recommended for this project (at least v16.13.0) defined in .nvmrc

- If nvm doesn't have v16.13.0 it will require one more step, if not skip this one

```
$ nvm install v16.13.0
$ nvm use
```

- Set up env

```
$ cp .env.dev.example .env.dev
```

### Run locally without docker

- Install all necessary dependencies

```
$ yarn
```

- Run migrations

```
$ yarn migration:run
```

- Run application

```
$ yarn start
```

### Or if you prefer using docker follow the following steps

- Firstly, install docker-compose following steps from: https://docs.docker.com/compose/install/
- Thereafter

```
$ cd .docker
$ docker-compose -f docker-compose.dev.yml build
$ docker-compose -f docker-compose.dev.yml up
```

### How to run tests

- Up test database

```
$ cd .docker
$ docker-compose -f docker-compose.dev.yml build
$ docker-compose -f docker-compose.dev.yml up mvpmatch-db-test
```

- Run tests
```
$ yarn test:integration
```

# Users:
```
buyer username: mvpmatchuser1
buyer password: Mvpmatchuser1!
seller username: mvpmatchuser2
seller password: Mvpmatchuser2!
```

## NOTE
- Dockerfile for production prepared 
