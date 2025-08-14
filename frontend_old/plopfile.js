// plopfile.js
module.exports = function (plop) {
  plop.setHelper('pascalCase', (text) => {
    return text
      .split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  });

  // Генератор компонента
  plop.setGenerator('component', {
    description: 'Create a React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
      },
      {
        type: 'input',
        name: 'folder',
        message: 'Parent folder (e.g., "features/header"):',
        default: 'shared/ui',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{folder}}/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{name}}/{{name}}.module.scss',
        templateFile: 'plop-templates/styles.hbs',
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{name}}/index.ts',
        templateFile: 'plop-templates/index.hbs',
      },
    ],
  });
};
