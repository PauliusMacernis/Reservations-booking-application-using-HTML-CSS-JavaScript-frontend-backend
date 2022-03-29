# Disclaimer

---------------------------------------

I am aware, the front-end solution is not perfect and may be tweaked much more. Some code may be refactored, 
optimized, etc. However, I have 10 minutes to push it today or 11 minutes to push it tomorrow. Choosing today.  

# Intro

---------------------------------------

Exercise: Reservations booking application using HTML CSS JavaScript (frontend, backend)
Provided by [Emotion](https://emotion.lt/) as [ON-932](https://emotion-ever-better.atlassian.net/browse/ON-932)

# Front

---------------------------------------

Written by me,  
influenced by Udemy course on JavaScript (see bellow for the links).  
For the details on how to install it, refer to `./front/README.md`  
After the installation, visit [http://localhost:8080](http://localhost:8080)


# Back

---------------------------------------

Taken from https://bitbucket.org/emtn/reservations-api/src/master/  
For the details on how to install it, refer to `./back/readme.md`  
After the installation, visit [http://localhost:8000](http://localhost:8000)


# Docs

Related material to be learning from on the way.

---------------------------------------

## JavaScript 

- MDN: [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- Udemy course: [https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/](https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/), especially Section 27


## Node.js

- [https://nodejs.dev/learn/introduction-to-nodejs](https://nodejs.dev/learn/introduction-to-nodejs)
- [https://nodejs.org/en/docs/guides/](https://nodejs.org/en/docs/guides/)


## GraphQL

### "SEND/GET" data from API

- General: [https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/282034202/Graphql](https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/282034202/Graphql)
- Get all reservations in a day according to a passed date: [https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/282034277/reservations](https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/282034277/reservations)
- Place a reservation: [https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/281936087/bookReservation](https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/281936087/bookReservation)
- Cancel a reservation: [https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/281936141/cancelReservation](https://emotion-ever-better.atlassian.net/wiki/spaces/DEV/pages/281936141/cancelReservation)

### GraphQL docs  

- General: [https://graphql.org/learn/](https://graphql.org/learn/)
- Clients: [https://graphql.org/graphql-js/graphql-clients/](https://graphql.org/graphql-js/graphql-clients/)
- Queries and mutations: [https://graphql.org/learn/queries/](https://graphql.org/learn/queries/)

## TypeScript

- [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- [https://www.udemy.com/course/understanding-typescript/#overview](https://www.udemy.com/course/understanding-typescript/#overview)

## Other

- https://developer.mozilla.org/en-US/
- https://caniuse.com/
- https://babeljs.io/docs/en/
- https://www.npmjs.com/package/babel-loader
- https://babeljs.io/docs/en/babel-preset-env
- https://github.com/zloirock/core-js
- https://developers.google.com/maps/documentation/javascript/overview
- https://openlayers.org/
- http://expressjs.com/
- https://jsperf.com/
- https://github.com/jsperf/jsperf.com
- https://developer.chrome.com/docs/devtools/evaluate-performance/reference/
- https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution
- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency
- https://github.com/expressjs/compression
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
- https://web.dev/http-cache/
- https://wp-rocket.me/blog/different-types-of-caching/
- https://developers.google.com/web/fundamentals/performance/http2
- https://developers.google.com/web/fundamentals/performance/rendering
- https://developer.chrome.com/docs/devtools/evaluate-performance/reference/
- https://developer.chrome.com/docs/devtools/memory-problems/
- https://academind.com/tutorials/javascript-testing-introduction
- https://www.harrymt.com/blog/2018/04/11/stubs-spies-and-mocks-in-js.html
- https://jestjs.io/docs/getting-started
- https://jestjs.io/
- https://mochajs.org/
- https://www.chaijs.com/
- https://puppeteer.github.io/puppeteer/
- https://killedbygoogle.com/
- https://byjus.com/maths/area-triangle-coordinate-geometry/
- https://adrianmejia.com/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/
- https://adrianmejia.com/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/
- https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/

# Converting to TypeScript (front-end only)

The regular JavaScript project of the previous challenge has been converted to TypeScript. And here you finally see the result.
The main steps to convert the regular JavaScript to TypeScript were these:

- `tsc --init`, and changes in the `tsconfig.json`
- `npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader`
- In case of development, use `tsc` or `tsc --watch` for the compilation from ts to js
- 