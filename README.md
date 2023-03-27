# Auto Fixture 🤖

<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/9404632/227989438-25adf349-6881-43d7-8d18-e89fca5c7914.png"
>
</p>

**VSCode extension to generate test data for your unit tests using ChatGPT 🤖**

This package is a VS Code extension that uses ChatGPT to generate fixtures (testing data) from the selected type definition. It provides an easy way to generate test data for GraphQL APIs and can save developers a lot of time when writing tests.

It is not published on the VSCode marketplace yet, but you can install it locally by cloning the repository and following the `vsc-extension-quickstart` guide.

## Usage

1. Open a new command palette (Ctrl+Shift+P) and type `Set API Key` to set your OpenAI API key.
2. Select a type/interface definition in your typescript code.
3. Open a new command palette (Ctrl+Shift+P) and type `Create Fixture` to generate fixtures for the selected type definition.
4. Another way is to open the context menu (right click) on the type definition and select `Create Fixture`.
5. The generated fixtures will be written after the selected type definition.

<img width="492" alt="CleanShot 2023-03-27 at 17 03 01@2x" src="https://user-images.githubusercontent.com/9404632/227981354-70ba8f81-014b-4ff0-a9d1-e886bdb16683.png">

## Example

Given the following type definitions:

```typescript
type Job = {
  id: number;
  name: string;
  description: string;
  salary: number;
}

type JobList = Job[];

type Person = {
  id: number;
  name: string;
  age: number;
  jobs?: JobList;
}
```

It generates the following fixture:
```typescript
const fixture: Person[] = [
  {
    id: 1,
    name: 'John',
    age: 32,
    jobs: [
      {
        id: 1,
        name: 'Software Engineer',
        description: 'Develop software applications',
        salary: 50000
      },
      {
        id: 2,
        name: 'Web Developer',
        description: 'Design and develop websites and web applications',
        salary: 40000
      }
    ]
  },
  {
    id: 2,
    name: 'Jane',
    age: 25
  },
  {
    id: 3,
    name: 'Jack',
    age: 38,
    jobs: [
      {
        id: 3,
        name: 'Data Scientist',
        description: 'Conduct data analysis and model development',
        salary: 60000
      }
    ]
  }
];
```
