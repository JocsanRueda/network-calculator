# Network Calculator

This project is a network calculator developed with React, TypeScript, and Vite. It allows users to define a network, specify subnets using Variable Length Subnet Masking (VLSM), and view the results of the network segmentation.

## Features

- Define networks and subnets using VLSM.
- Calculate IP addresses, subnet masks, broadcast addresses, etc.
- View network usage statistics.
- Interactive and responsive user interface.

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Recharts](https://recharts.org/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/network-calculator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd network-calculator
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to find and fix problems in the code.
- `npm run preview`: Previews the built application.

## ESLint Configuration

If you are developing a production application, it is recommended to update the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Project Structure

```
├── .gitignore
├── .prettierrc
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   ├── settings.json
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── common/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── model/
│   ├── pages/
│   ├── schema/
│   ├── utils/
```

## Usage

1. Define the initial network on the "Define Network" page.
2. Specify the subnets on the "Define Host" page.
3. View the results on the "View Result" page.

## Contributing

Contributions are welcome. Please open an issue or a pull request to discuss any changes you would like to make.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.