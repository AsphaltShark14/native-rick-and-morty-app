module.exports = (plop) => {
  plop.setHelper("basename", (txt) => txt.split("/").at(-1));

  plop.setGenerator("component", {
    description: "React Native Component",
    prompts: [
      {
        type: "list",
        name: "export",
        choices: ["named", "default"],
        default: "named",
        message: "Export type",
      },
      {
        type: "input",
        name: "path",
        message: "Component path",
      },
    ],
    actions: (args) => [
      {
        type: "addMany",
        destination: "src/{{path}}",
        base: ".templates/component",
        templateFiles: ".templates/component/*.hbs",
        data: { isDefaultExport: args.export === "default" },
      },
    ],
  });

  plop.setGenerator("context", {
    description: "React.js Context",
    prompts: [
      {
        type: "list",
        name: "kind",
        choices: ["simple", "service"],
        default: "simple",
        message: "Context kind",
      },
      {
        type: "input",
        name: "path",
        message: "Context path",
      },
      {
        type: "input",
        name: "model",
        message: "Service model name",
        when: (args) => args.kind === "service",
      },
    ],
    actions: (args) => [
      {
        type: "add",
        path: "src/{{path}}.tsx",
        templateFile: ".templates/context/Context.tsx.hbs",
        data: { isSimple: args.kind === "simple" },
        force: true,
      },
    ],
  });
};
