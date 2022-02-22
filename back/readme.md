## Install & Run

### Required setup:

```bash
nodejs --version # must be `10^
npm --version    # must be `7^
```

### Steps to start api locally:

```bash
cd ./back # i.e. the root for this readme.md
npm install
echo "MONGO_USER = test_user\nMONGO_PASSWORD = fOnjVFcYyaN38l1T\nMONGO_DB = reservations-dev\nPORT = 8000\nSECRET_KEY = plsffbn585412fdfsda" > .env
node app.js`
```
