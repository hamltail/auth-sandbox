# Auth.js Sandbox

Next.js 環境で Auth.js の機能や実装方法を検証するためのプロジェクトです。

## Verification Topics

- メールアドレスとパスワードによる認証
- Google認証
- JWTセッション
- 認証が必要なページの保護
- ユーザー情報の取得
- ログアウト
- Prismaとの連携
- エラーハンドリング

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Auth.js
- Prisma
- PostgreSQL

## Requirements

- Node.js 24
- npm
- Docker Desktop

Node.js のバージョンは `.nvmrc` で管理しています。

## Setup

```bash
nvm use
npm install
```

### Start PostgreSQL

ローカル開発では Docker 上の PostgreSQL を使用します。

```bash
docker compose up -d
```

起動状態を確認します。

```bash
docker compose ps
```

### Stop PostgreSQL

PostgreSQL を停止する場合は、以下を実行します。

```bash
docker compose down
```

### Environment Variables

ローカル開発では `.env.local` を使用します。

Docker Compose では PostgreSQL をホストの `5434` ポートで公開しています。

```env
# Auth.js
AUTH_SECRET=""

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/authjs_sandbox"

# Google OAuth
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

### Database

マイグレーションを適用し、Prisma Client を生成します。

```bash
npx prisma migrate dev
npx prisma generate
```

### Start Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm run test:run
npm run test:e2e
```

### Prisma Studio

データベースを確認する場合は Prisma Studio を起動します。

```bash
npx prisma studio
```

## License

このリポジトリは学習・技術検証目的で公開しています。

著作権は作者に帰属します。
無断転載・再配布・商用利用はご遠慮ください。

This repository is published for learning and technical verification purposes.

All rights to the content belong to the author.

Please do not reproduce, redistribute, or use any part of this project for commercial purposes without permission.

## Author

- h-waji (hamltail)
