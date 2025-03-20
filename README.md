# Day One

[English](#english) | [日本語](#japanese)

<a id="english"></a>
# Day One

This repository (day-one) is a monorepo designed to record technical problems encountered in daily development and their solutions.

## Purpose

The purpose is to save problems and stumbling points encountered during development with minimally reproducible code and share them along with solutions. Each problem is managed as an independent application or package that can be easily referenced when needed.

## Structure

This monorepo is structured using Turborepo as follows:

### Applications and Packages

- `apps/`: Minimal applications to reproduce problems
- `packages/`: Common components and utilities

Each application/package is implemented in TypeScript.

### Usage

To check the reproduction of a problem and its solution:

```
# Clone the repository
git clone https://github.com/nagauta/day-one.git
cd day-one

# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# To run only a specific app
pnpm dev --filter=app-name
```

### How to Add a Project

When adding a new problem and solution:

1. Create a new application in the `apps/` directory
2. Reproduce the problem with minimal code
3. Implement the solution and add explanations in comments
4. Document the details of the problem and an overview of the solution in the application's README

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Turborepo](https://turbo.build/repo)
- Frameworks like [Next.js](https://nextjs.org/) (depending on the problem)
- [pnpm](https://pnpm.io/) package manager

## Contributions

Additions of problems and solutions are very welcome. When sending a PR, please ensure that the problem reproduction is kept minimal.

---

<a id="japanese"></a>
# Day One

このリポジトリ（day-one）は、日々の開発で遭遇する技術的な問題とその解決策を記録するためのmonorepoです。

## 目的

開発中に「ハマった問題」や「躓いたポイント」を最小限の再現可能なコードで保存し、解決策とともに共有することを目的としています。各問題は独立したアプリケーションやパッケージとして管理され、必要な時に簡単に参照できます。

## 構成

このmonorepoはTurborepoを使用して以下の構成になっています：

### アプリケーションとパッケージ

- `apps/`: 問題を再現するための最小限のアプリケーション
- `packages/`: 共通のコンポーネントやユーティリティ

各アプリケーション/パッケージはTypeScriptで実装されています。

### 使用方法

問題の再現と解決策を確認するには：

```
# リポジトリをクローン
git clone https://github.com/nagauta/day-one.git
cd day-one

# 依存関係をインストール
pnpm install

# すべてのアプリを開発モードで実行
pnpm dev

# 特定のアプリだけ実行する場合
pnpm dev --filter=app名
```

### プロジェクトの追加方法

新しい問題と解決策を追加する場合：

1. `apps/`ディレクトリに新しいアプリケーションを作成
2. 問題を最小限のコードで再現
3. 解決策を実装し、コメントで説明を追加
4. アプリケーションのREADMEに問題の詳細と解決策の概要を記載

## 技術スタック

- [TypeScript](https://www.typescriptlang.org/)
- [Turborepo](https://turbo.build/repo)
- [Next.js](https://nextjs.org/)などのフレームワーク（問題に応じて）
- [pnpm](https://pnpm.io/) パッケージマネージャー

## 貢献について

問題と解決策の追加は大歓迎です。PRを送る際は、問題の再現が最小限になるように心がけてください。
