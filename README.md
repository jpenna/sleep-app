# Sleep Record App

This codebase included the server and client code of the application.

## Get started

1. You should have NodeJS locally. If you don't have it, run the following:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash # Install nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm --version # Check installation

nvm install 10
nvm alias default 10
```

2. You should have `yarn` installed globally. If you don't, run the following:

```bash
npm install -g yarn
```

3. Copy `.env.example` and rename it to `.env` in both `/web` and `/server`.

4. Open 2 terminal windows.

**Terminal 1**

This will start the database and the server.

```bash
cd server
yarn start
```

**Terminal 2**

This will serve the client application with `webpack-dev-server`.

```bash
cd web
yarn start
```

5. Open the server at http://localhost:3000/ or the address given in the terminal.

## Tests

No tests included. Because it is a small project with very short "coding life span",
I decided to skip tests and focus my time on tech decisions, structure and features.

## Highlights

- Reconnect DB
- Validate overlaying sleep records
- Scalable: sleep records are embedded in user document
- GraphQL
- Docker: MongoDB + Mongo Express
- Typescript

## TODO

- [ ] Authentication (multi-user)
- [ ] Modal to confirm deletion of record
- [ ] Route menu items
- [ ] "Push&Play" record button (frontend)
- [ ] Chart: Time went to bad, Sleep duration over time
- [ ] Reports: Average sleep duration
- [ ] Work on style
- [ ] Tests
