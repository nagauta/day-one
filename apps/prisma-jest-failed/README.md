## Prisma x JestでFakeTImerを使った場合に失敗するケースについて

[Jest.useFakeTimers doesn't work with Prisma defaults](https://github.com/prisma/prisma/issues/16719)というissueが上がっているようにJestでFakeTimerを使用するとPrismaを使ったテストが機能しなくなる

### 成功するケース
`pnpm test --filter "@dayone/prisma*" apps/prisma-jest-failed/src/__tests__/api.test.ts`


### 失敗するケース
`pnpm test --filter "@dayone/prisma*" apps/prisma-jest-failed/src/__tests__/api-failed.test.ts`