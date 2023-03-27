# Auto Fixture

**VSCode extension to generate test data for your unit tests using ChatGPT 🤖**

This package is a VS Code extension that uses ChatGPT to generate fixtures (testing data) from the selected type definition. It provides an easy way to generate test data for GraphQL APIs and can save developers a lot of time when writing tests.

It is not published on the VSCode marketplace yet, but you can install it locally by cloning the repository and following the `vsc-extension-quickstart` guide.

## Usage

1. Open a new command palette (Ctrl+Shift+P) and type `Set API Key` to set your OpenAI API key.
2. Select a type/interface definition in your typescript code.
3. Open a new command palette (Ctrl+Shift+P) and type `Create Fixture` to generate fixtures for the selected type definition.
4. Another way is to open the context menu (right click) on the type definition and select `Create Fixture`.
5. The generated fixtures will be written after the selected type definition.
