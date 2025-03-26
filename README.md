![Playwright Logo](logos/pw-logo.svg)
![Jest Logo](logos/jest.svg)

<img src="logos/ghost-logo-light.png" width="120" alt="Ghost Logo" />

# Ghost Automation Test Suite

## Overview

Automated end-to-end testing framework for [Ghost CMS](https://ghost.org), powered by:

- [Playwright](https://playwright.dev) for UI automation and end-to-end tests
- [Jest](https://jestjs.io) + [SuperTest](https://github.com/visionmedia/supertest) for API testing
- Dockerized test and app environments for full isolation and repeatability

---

## Dockerized Architecture

This project runs both Ghost CMS and the test suite using **Docker Compose**.

---

## Features

- **Scalable & Maintainable:** Easily extendable with new test cases without modifying core test logic
- Fully **Dockerized local environment** for Ghost and automation tests
- **Page Object Model (POM)** for reusable and organized test logic
- Isolated test cases with automatic **post cleanup** via API
- UI + API coverage for full-stack reliability and speed
- Custom logging utility (`utils/logger.js`) for readable output
- Admin **JWT token generator** for API auth
- **Auth cookie caching** to speed up UI tests

---
---

## ⚙️ Project Setup

### 1. Clone and install dependencies

```sh
  git clone https://github.com/Sh00mka-bot/ghost-automation.git
  cd ghost-automation
  npm install
```

#### 2. Set up .env file
```sh
  npm run setup-env
```
Creates a .env file with:
```env
BASE_URL=http://localhost:2368
LOG_LEVEL=debug
ADMIN_API_KEY=
```
#### 3. Start the Docker environment
```shell
  docker compose up -d
```

### 🔑 Admin Setup Scripts:
#### Create Admin Profile (first-time setup)
```shell
  npm run setup-admin
```
This launches a Playwright browser that:
 - Navigates to Ghost setup page 
 - Fills in the blog title, admin name, email, and password 
 - Completes onboarding

#### ⚠️ Manual Step: Add Admin Integration
After setup, log in to Ghost and:
1.	Go to Settings → Integrations
2.	Create a Custom Integration
3.	Copy the Admin API Key (format: id:secret)


#### Inject Admin API Key [ id:secret ] into .env
```shell
  npm run api-key id:secret
```
This updates .env file:
```env
ADMIN_API_KEY=id:secret
```

## Execute Tests:

UI Tests:
```sh
  npx playwright test
```
API Tests:
```shell
  npm run test.api
```


---
### Contact
For any questions or feedback, feel free to reach out!

