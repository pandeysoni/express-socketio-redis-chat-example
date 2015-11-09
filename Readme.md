# Express.js Socket.io Redis Chat Example

A basic chat application built with Express.js Socket.io and Redis Publish/Subscribe

## How?

We are using the following components to build our chat app:

1. **Express.js** (node.js web framework)
+ **Socket.io** (WebSockets with fallback for older clients) - If you're new to Socket.io see: http://socket.io/get-started/chat/
+ **Redis** (high performance message storage and publish/subscribe) - If you or anyone on your team are *completely* new to Redis, check out: https://github.com/dwyl/learn-redis

### Why Redis?

Socket.io only handles distributing messages, if people disconnect from the chat they will miss any subsequent messages and when anyone connects there will see no history ... so we need a place to store messages for retrieval.

Top 3 reasons why Redis is the *clear* choice for storing chat messages.

1. ***Speed***  - **Redis** is _**much faster** than MongoDB, CouchDB or PostgreSQL_
2. ***Simple*** - pushing messages onto a list (set) is the _simplest
possible_ way to store a chat history. Given that we can store up to **512Mb** *per chat* and *stream* chat *history* to new clients (*low http overhead*) its an
*incredibly simple setup*!
3. ***Scalable*** ***Publish/Subscribe*** ("_pattern_") means you can scale *out*
(*add more node.js/socket.io servers when you need to serve more clients*)
Redis can already handle an ***order of magnitude*** more than other NoSQL Databases,
so your most likely "bottleneck" is node (*nuts, hey!?*)

#### 1. Install Redis (_if you don't already have it!_)

If you haven't already got an instance of Redis running on your machine,
Our Redis tutorial has instructions:
> https://github.com/dwyl/learn-redis#installation

#### 2. Install the Dependencies and Start the Server

Install the dependencies and *start* the app with:
```sh
npm install && npm start
```

> Now visit: http://localhost:8000 (_in your browser_)
