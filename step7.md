[README TOP](./README.md)

# Step7 : Code formatter

Instruction for setup code formatter after step1.

## 1. Add Prettier

```sh
pnpm add -D prettier
```

## 2. Create a coding file

```sh
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

## 3. Edit .prettierrc

Before

```json
(Empty)
```

After

```json
{
  "semi": false,
  "singleQuote": true
}
```

## 4. Format the code

```sh
pnpm exec prettier . --write
```
