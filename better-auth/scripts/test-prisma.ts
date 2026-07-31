import { config } from "dotenv";

config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = `hamru-${Date.now()}@example.com`;

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: "Hamru",
      email,
    },
  });

  console.log("作成:", user);

  const users = await prisma.user.findMany();
  console.log("一覧:", users);

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: "Hamru Updated",
    },
  });

  console.log("更新:", updatedUser);

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  const remainingUsers = await prisma.user.findMany();
  console.log("削除後:", remainingUsers);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
