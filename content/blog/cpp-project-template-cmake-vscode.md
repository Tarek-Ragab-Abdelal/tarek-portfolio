---
title: "C++ Project Template with CMake and VSCode"
excerpt: "How I structured a reusable C++ template to help learners and professionals start projects with a clean, maintainable baseline."
date: "2024-04-19"
tags: ["C++", "CMake", "VSCode", "Tooling"]
coverImage: "/images/blog/cpp-project-template.jpg"
sourceUrl: "https://www.linkedin.com/posts/tarek-ragab_c-project-template-activity-7187153298230034433-7dWD"
---

![C++ project template cover](/images/blog/cpp-project-template.jpg)

If you have ever started a C++ project and spent the first hour figuring out folder structure, CMake configuration, and how to get VSCode to actually build and debug correctly, you know the problem. I built this template because I kept solving the same setup problem over and over, and I watched students and colleagues do the same.

The [CppTemplate repo](https://github.com/Tarek-Ragab-Abdelal/CppTemplate) is intentionally minimal. It is not a framework. It is a starting point that gives you a working build, a clean folder layout, and enough structure to grow without fighting your tooling.

## The problem this solves

C++ does not have a `create-react-app` equivalent. When you start a new project, you are on your own for:

- **Folder structure**: Where do headers go? Where do source files go? How do you organize libraries?
- **Build system**: Raw Makefiles are fragile. CMake works, but the learning curve is steep for beginners.
- **Editor integration**: Getting VSCode to understand your include paths, build targets, and debug configurations takes trial and error.

I have seen teams lose entire afternoons to build setup issues. I have seen students give up on C++ projects not because the language was hard, but because the tooling was hostile. This template removes that friction.

## How the template is organized

The structure follows a pattern I have used across embedded and systems projects:

```
|- CMakeLists.txt
|--include/
|   |- config.h
|   |- defaults.h
|--lib/
|   |--Boo/
|   |   |--docs/
|   |   |--examples/
|   |   |--src/
|   |       |- Boo.cpp
|   |       |- Boo.h
|   |--Foo/
|       |- Foo.cpp
|       |- Foo.h
|--src/
|   |- main.cpp
|--test/
    |- unit_test.cpp
```

A few decisions behind this layout:

- **`include/` for project-wide headers**: Configuration and shared definitions live here, separate from library-specific headers.
- **`lib/` for internal libraries**: Each library gets its own directory with source, headers, docs, and examples. This mirrors how real codebases grow. When you add a new module, you create a new folder under `lib/` and register it in CMake.
- **`test/` for unit tests**: Having a test directory from day one encourages writing tests early. Even if you start with a single test file, the structure is there when you need it.

## The CMake configuration

The `CMakeLists.txt` is designed to be readable, not clever. It handles:

1. Setting the C++ standard.
2. Defining the main executable from `src/main.cpp`.
3. Adding internal libraries from `lib/`.
4. Configuring include paths so headers resolve without relative path gymnastics.

The key principle: you should be able to add a new library by creating a folder and adding two lines to CMake. If your build system requires more ceremony than that, people will skip it and dump everything in `main.cpp`.

## VSCode integration

I recommend the [CMake Tools extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) for VSCode. With it installed, you get:

- **Build/run from the status bar**: No terminal commands needed for basic workflows.
- **Debug and Release configurations**: Switch between them with a click.
- **IntelliSense that actually works**: Because CMake Tools feeds the correct include paths to the C++ extension.

The template works out of the box with this setup. Clone, open in VSCode, let CMake Tools configure, and you are building within 30 seconds.

## Getting started

```bash
git clone https://github.com/Tarek-Ragab-Abdelal/CppTemplate
cd CppTemplate
mkdir build && cd build
cmake ..
cmake --build .
./debug/main.exe
```

Or just open the folder in VSCode with CMake Tools installed and click Build.

## Why structure matters more than people think

I have worked on embedded projects where the codebase started as a single file and grew into a tangled mess of includes and circular dependencies. Refactoring a flat project into a structured one is painful. Starting structured is cheap.

This template is not about enforcing rules. It is about giving you a baseline that scales. Whether you are building a university assignment, a firmware prototype, or a systems utility, the same layout works. I use variations of this structure in professional embedded work, and it has saved me significant setup time on every new project.

Good project structure is invisible when it works, and painfully obvious when it does not. Start with a good baseline, and the rest of your engineering effort goes toward the actual problem you are solving.
