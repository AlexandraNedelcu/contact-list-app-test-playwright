# 🧪 Contact List App - Playwright Test Automation Framework

This is a Playwright-based automated testing framework for the demo web application [Contact List App](https://thinking-tester-contact-list.herokuapp.com/).  
It follows the **Page Object Model (POM)** structure, uses data-driven testing, and integrates with **GitHub Actions** for CI/CD.

---

## 📁 Project Structure

```plaintext
📦 project-root
 ┣ 📂 pages/ # Page Object Models (POM)
 ┣ 📂 fixtures
 ┃ ┣ 📄 custom-fixtures.ts # Custom fixture for tests setup (eg. authentication, tokens)
 ┣ 📂 tests
 ┃ ┣ 📄 e2e/ # End-to-end scenarios
 ┃ ┣ 📄 api/ # API tests
 ┃ ┣ 📄 utils/
 ┃ ┃ ┣ 📄 apiHelpers.ts # Helper functions for API tests
 ┃ ┃ ┣ 📄 testData.ts # Predefined test data
 ┣ 📄 playwright.config.ts # Global Playwright configuration
 ┣ 📄 package.json
 ┣ 📄 .env
 ┣ 📄 README.md
 ┗ 📄 .github/workflows/ # GitHub Actions config
```

## 🚀 Getting Started

### 1. Clone the repository
```git clone https://github.com/AlexandraNedelcu/contact-list-app-test-playwright.git``` </br>
```cd contact-list-app-test-playwright```

### 2. Install dependencies </br>
```npm install```

### 3. Install Playwright browsers </br>
```npx playwright install```

### 4. Configure the .env file (example) </br>
```
BASE_URL=http://localhost:3000
TEST_USER_EMAIL=example@test.com
TEST_USER_PASSWORD=test1234
```

### 5. Run tests
Run all tests:
```npx playwright test```

Run API tests only:
```npx playwright test tests/api```

Run E2E tests only:
```npx playwright test tests/e2e```

Open the report:
```npx playwright show-report```

## ⚙️ GitHub Actions CI/CD
Located at: .github/workflows/playwright.yml

Workflow Includes:
- Runs on demand
- Installs dependencies and browsers
- Runs regression suite
- Saves test artifacts: Screenshots, Videos, Traces (open with npx playwright show-trace)

## 🛠 Debugging Failures
You’ll find screenshots, videos and trace files for failed tests in the GitHub Actions artifacts section. To open a trace locally:
npx playwright show-trace trace.zip

## 🤝 Contributing
This is a demo learning project for QA automation. Contributions are welcome!

## 📜 License
MIT
