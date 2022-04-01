## Install & Run

### Required setup:

```bash
nodejs --version # must be `10^
npm --version    # must be `7^
```

### Steps to start api locally:

```bash
cd ./back # i.e. the root for this README.md
npm install
npm audit fix # optional

echo "MONGO_USER = test_user" > .env \
  && echo "MONGO_PASSWORD = fOnjVFcYyaN38l1T" >> .env \
  && echo "MONGO_DB = reservations-dev" >> .env \
  && echo "PORT = 8000" >> .env \
  && echo "SECRET_KEY = plsffbn585412fdfsda" >> .env

node app.js
```

Visit [http://localhost:8000](http://localhost:8000)