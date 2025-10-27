[README TOP](./README.md)

# Step6 : Project setting

Instruction for setup project after step5.

## 1. Add & Edit files

| No. | File                  | Description                              |
| --: | --------------------- | ---------------------------------------- |
|   1 | .vscode/tasks.json    | Start dev server task before debug.      |
|   2 | .vscode/launch.json   | Configuration for debugging.             |
|   3 | .vscode/settings.json | Setting file nesting of VSCode explorer. |
|   4 | .gitignore            | Setting git ignore file.                 |
|   5 | tsconfig.json         | Add transpile options.                   |

### .vscode/tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "pnpm: dev",
      "type": "shell",
      "command": "pnpm dev",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "."
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".",
          "endsPattern": "(Local:|Network:)"
        }
      }
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell"
    }
  ],
  "inputs": [
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```

### .vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}",
      "sourceMaps": true,
      "preLaunchTask": "pnpm: dev",
      "postDebugTask": "Terminate All Tasks"
    }
  ]
}
```

### .vscode/settings.json

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json",
    "package.json": "package-lock.json, pnpm-*"
  }
}
```

### .gitignore

```
# Dependencies
node_modules/

# Build outputs
dist/

# Development cache and tmp files
tmp/

# Environment files
.env

# IDE files
.vscode/*
!.vscode/launch.json
!.vscode/settings.json
!.vscode/tasks.json

# OS generated files
.DS_Store
._*
Thumbs.db

# Coverage directory
coverage/
```

### tsconfig.json

Before

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./tmp/tsconfig.tsbuildinfo",
    "types": ["unplugin-vue-router/client"]
  },
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["src/**/*", "types/**/*"]
}
```

After

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "tsBuildInfoFile": "./tmp/tsconfig.tsbuildinfo",
    "types": ["unplugin-vue-router/client"]
  },
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["src/**/*", "types/**/*"]
}
```

## 2. Start debug

Press F5 key to start debug.  
You can debug with break point in VSCode.
