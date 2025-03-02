# Learning Project for Frontend Development

This repository is designed for learning and practicing advanced topics in frontend development. It includes modern tools and technologies such as Webpack, ESLint, Stylelint, Jest, Loki, and Storybook, offering a complete ecosystem for development, testing, and interface analysis.

---

## 📂 **Project Structure**
- **Frontend**: Main interface code organized according to modern standards.
- **JSON Server**: Local server for API testing.
- **Configuration**: Files for linting, testing, and build configuration.

---

## 📜 **Scripts**

Description of the available scripts in `package.json`:

### **Starting the Application**
- **`start`**  
  Launches the application using Webpack Dev Server on port `3000`.
  ```bash
  yarn start
  ```

- **`start:dev:server`**  
  Starts the local JSON server to emulate API responses.
  ```bash
  yarn start:dev:server
  ```

---

### **Building the Project**
- **`build:prod`**  
  Builds the project for production with optimizations.
  ```bash
  yarn build:prod
  ```

- **`build:dev`**  
  Builds the project for development with source maps enabled.
  ```bash
  yarn build:dev
  ```

---

### **Linting**
- **`lint:ts`**  
  Checks TypeScript/TSX code against ESLint rules.
  ```bash
  yarn lint:ts
  ```

- **`lint:ts:fix`**  
  Automatically fixes TypeScript/TSX linting errors.
  ```bash
  yarn lint:ts:fix
  ```

- **`lint:scss`**  
  Checks SCSS files against Stylelint rules.
  ```bash
  yarn lint:scss
  ```

- **`lint:scss:fix`**  
  Automatically fixes Stylelint errors in SCSS files.
  ```bash
  yarn lint:scss:fix
  ```

---

### **Testing**
- **`test:unit`**  
  Runs unit tests using Jest.
  ```bash
  yarn test:unit
  ```

- **`test:ui`**  
  Executes visual interface tests with Loki.
  ```bash
  yarn test:ui
  ```

- **`test:ui:ok`**  
  Approves changes to Loki reference snapshots.
  ```bash
  yarn test:ui:ok
  ```

- **`test:ui:ci`**  
  Runs visual tests in a CI environment using static Storybook files.
  ```bash
  yarn test:ui:ci
  ```

- **`test:ui:report`**  
  Generates a visual report after tests: JSON and HTML versions.
  ```bash
  yarn test:ui:report
  ```

---

### **Storybook**
- **`storybook`**  
  Launches Storybook for component development on port `6006`.
  ```bash
  yarn storybook
  ```

- **`storybook:build`**  
  Generates a static Storybook build for deployment.
  ```bash
  yarn storybook:build
  ```

---

## 📦 **Installation**
To run the project, follow these steps:
1. Install dependencies:
   ```bash
   yarn install
   ```
2. Start the development server:
   ```bash
   yarn start
   ```

---

### **Generating slices in layers**
- **`generage:slice`**  
  Launches script in node environment which create structure with directories and files.
  You have to pass args <layerName> and <cliseName> for successful script execution.
  Acceptable layers names are: features, entities, pages.
  ```bash
  yarn generage:slice feature featureName
  ```

---

## 🛠 **Technologies Used**
- **Build System**: Webpack
- **Linting**: ESLint, Stylelint
- **Testing**: Jest, Loki
- **Component Documentation**: Storybook

---

## 📖 **Learning Recommendations**
This project will help you master:
- Setting up and configuring modern development tools.
- Writing unit, integration, and visual tests.
- Building documented and reusable components.

Happy Coding! 🚀
