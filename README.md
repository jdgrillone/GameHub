# GameHUB

GameHUB is an application with one goal in mind:  To digitize your video game library, and to connect with other gamers.  Has simple user authentication and uses the IGDB API to validate and pull information for all games added. Uses a React front-end and is backed by MongoDB.  *Note* - This application does not use your email for anything nefarious.  It is used simply for log-in purposes and nothing else.

This application incorporates the following packages:
* bcryptjs
* body-parser
* express
* express-session
* igdb-api-node
* jsonwebtoken
* mongoose
* passport
* validator
* react-router-dom
* axios

## Getting Started

### USER:
[Heroku Deployment Link](https://t-gamehub.herokuapp.com/ "GameHUB Homepage")
// LOG IN AND SIGN UP IMAGES
1. Log in or sign up
// DASHBOARD IMAGE
2. Add games to your list by clicking the "ADD GAME" button
// ADD GAME IMAGE
3. Click on the toggle to expand the game, then click on "SET TO ACTIVE" button to set yourself as actively playing the selected game.
// FRIEND LIST IMAGE
4. Add friends through the "USER LIST" button at top, search by username, then click on the menu next to their name to view profile or follow the user.

### Developers:
These instructions will get you a copy of the project up and running on your local machine.

#### Prerequisites
Must have an [IGDB API key](https://www.igdb.com/api "GameHUB Homepage") and a JWT secret string set as environment variables (or just hard code them into server.js).

#### Installation
After cloning the repo, follow the steps below:
```$ cd GameHub```
```$ yarn install```
```$ sudo mongod```
```$ yarn start```

## Screenshots
Login:
![Screenshot](/images/Login.png)
Signup:
![Screenshot](/images/Sign-Up.png)
Dashboard:
![Screenshot](/images/Dashboard.png)
Friends List:
![Screenshot](/images/friends-list.png)
Add Game:
![Screenshot](/images/add-game.png)