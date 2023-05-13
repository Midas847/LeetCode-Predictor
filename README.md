<!-- markdownlint-disable MD033 -->

<div align="center">
  <h1>Leetcode Predictor</h1>
  This is a leetcode predictor whcih predicts ratings of weekly and biweekly contest 2-3 hrs right after contest ends. 
  <br>The site is available at https://leetcode-predictor.vercel.app/ <br>
  <b>Go check it out !!!</b>
  <br />
  <br />
</div>
</div>

# About
  
It takes about 4-5 days for leetcode to update the contest ratings of participants. So you have to wait for a long time to know your rating changes. This application predicts accurate leetcode rating changes for all the contestants within a few minutes of completion of the contest.

<div align="center">
  <img src="./data/screenshots/web_demo.gif" alt="website preview">
</div>

# How It Works

This project is written in MERN stack. It used C++ addon to calculate ratings based on ELO rating mechanism.
You can check it out here [https://leetcode.com/discuss/general-discussion/468851/New-Contest-Rating-Algorithm-(Coming-Soon)]

## Database

* [MongoDB](https://www.mongodb.com/): NoSQL database

## Backend

* [Node.js](https://nodejs.org/en): open-source, cross-platform JavaScript runtime environment
* [Express](https://expressjs.com/) : Node.js framework
* [C++ addon](https://nodejs.org/api/addons.html) : core prediction algorithm implementation and acceleration
* [Bottleneck](https://github.com/SGrondin/bottleneck#readme) : lightweight and zero-dependency Task Scheduler and Rate Limiter for Node.js and the browser
* [Node-cache](https://github.com/node-cache/node-cache) : A simple tool for caching data.
* [Axios](https://axios-http.com/) : To make API calls.

## Frontend

* [React](https://reactjs.org/): most popular front-end library
* [TailwindCSS](https://tailwindcss.com/) : modern CSS framework and its component library


# Development

Follow these steps to run the app locally.

## Backend Deployment

### C++ addon
```
git clone https://github.com/Midas847/LeetCode-Predictor.git
cd Rating_Algorithm
npm i -g node-gyp
node-gyp configure
node-gyp build
```

### Sever 

```
git clone https://github.com/Midas847/LeetCode-Predictor.git
cd api
npm install
npm start
```

## Frontend Deployment

```
git clone https://github.com/Midas847/LeetCode-Predictor.git
cd client
npm install
npm start
```

## Contributors
