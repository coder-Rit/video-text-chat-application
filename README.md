# Backend setup
### TypeScript + NodeJS + GraphQL + Redis + Docker + MongoDB + ExpressJS
![Sample Image]([https://example.com/sample-image.jpg](https://cdn-icons-png.flaticon.com/512/5968/5968381.png)) 
clone backend repo 
``` shell
git clone https://github.com/coder-Rit/nodeServer-basic-auth
```

install these packages install packages 
```JSON
 "scripts": {
    "start": "node build/index.js",
    "dev": "tsc-watch --onSuccess \"npm start\""
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/node": "^20.4.3",
    "prisma": "^5.0.0",
    "ts-node": "^10.9.1",
    "tsc-watch": "^6.0.4",
    "typescript": "^5.1.6"
  },
  "dependencies": {
    "@apollo/server": "^4.8.1",
    "@prisma/client": "5.0.0",
    "express": "^4.18.2",
    "graphql": "^16.7.1",
    "jsonwebtoken": "^9.0.1"
  }
```

configure typescripts support

``` shell
npm tsc --init
```

```JSON
 "compilerOptions": {
   "rootDir": "./src" /* Specify the root folder within your source files. */,
   "outDir": "./build" /* Specify an output folder for all emitted files. */,
 }
```

now run the comman 

```shell
npm run dev
```
