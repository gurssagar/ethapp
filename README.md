# Project: GITFUND

### Overview

This is a comprehensive GitHub repository, built on top of a Node.js and React framework, utilizing the Next.js toolkit, and integrating with the GitHub API and Express.js to provide a robust set of features. It also leverages the solidity compiler and Remix to create a decentralized application. Below are the key features and functionalities implemented in this project:

![GITFUND](https://s3.tebi.io/phg/Screenshot%202025-03-01%20082051.png)

### Prerequisites

- Node.js: Ideally running version ^14.21.0 || >=16
- npm or pnpm (recommended)
- TypeScript

### Technologies Used

-  Next.js
  *For building and serving the application.*
-  Express.js
  *Used for setting up backend endpoints.*
-  Solidity
  *For building smart contracts on the Ethereum network using Remix.*
-  Remix
  *For developing, testing, and deploying smart contracts.*
-  GitHub API
  *For authenticating and interacting with GitHub.*
-  express
-  Axios
  *Used for making HTTP requests.*

### Features

- **Responsive web application**: Built using JavaScript, TypeScript, and Next.js, provides an engaging user interface
- **API Authentication**: OAuth capabilities with the ability to seamlessly log in to GitHub, utilizing the GitHub API.
- **Server-side rendering**: Utilizing Next.js to handle server-side rendering and efficient content delivery
- **Decentralized application**: Deployed on Ethereum using Solidity and Remix for seamless blockchain transactions
- **Interactive UI Components**: Leveraging React and React Hook libraries to build responsive and interactive UI components

### Technical Requirements

To run this project, navigate to your command line and follow these steps:

* Install dependencies with `pnpm install`
* Verify that your node engine is within the specified version constraints (node version >=14)
* Initialize your project with `npx next dev`

### Contributing

1. Fork the repository
2. Create your feature branch: `git branch name-new-feature`
3. Commit your changes: `git commit -m "brief description of commit"`
4. Push to the branch: `git push origin name-new-feature`
5. Open a pull request: select the branch in the github UI and submit a pull request.

### License
This project uses the [MIT License](https://spdx.org/licenses/MIT.html)

### Setup
* Run `npm run dev`
#### Frontend
* Navigate to the frontend directory: `cd frontend`
* Run the development server with `npm run dev`

#### Backend
* Navigate to the main directory: `cd backend`
* Run the server with `node server.js`

#### Contract Deployment
Follow the documentation on the Remix website to set up and deploy your contracts.
