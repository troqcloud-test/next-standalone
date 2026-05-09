import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const USERS = [
  { name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { name: "Bob Smith", email: "bob@example.com", role: "user" },
  { name: "Carol White", email: "carol@example.com", role: "moderator" },
  { name: "David Brown", email: "david@example.com", role: "user" },
  { name: "Eve Davis", email: "eve@example.com", role: "user" },
  { name: "Frank Miller", email: "frank@example.com", role: "user" },
  { name: "Grace Wilson", email: "grace@example.com", role: "moderator" },
  { name: "Henry Moore", email: "henry@example.com", role: "user" },
  { name: "Iris Taylor", email: "iris@example.com", role: "user" },
  { name: "Jack Anderson", email: "jack@example.com", role: "admin" },
  { name: "Karen Thomas", email: "karen@example.com", role: "user" },
  { name: "Leo Jackson", email: "leo@example.com", role: "user" },
  { name: "Mia Harris", email: "mia@example.com", role: "user" },
  { name: "Nate Martin", email: "nate@example.com", role: "moderator" },
  { name: "Olivia Garcia", email: "olivia@example.com", role: "user" },
  { name: "Paul Martinez", email: "paul@example.com", role: "user" },
  { name: "Quinn Robinson", email: "quinn@example.com", role: "user" },
  { name: "Rachel Clark", email: "rachel@example.com", role: "user" },
  { name: "Sam Rodriguez", email: "sam@example.com", role: "user" },
  { name: "Tina Lewis", email: "tina@example.com", role: "moderator" },
  { name: "Uma Lee", email: "uma@example.com", role: "user" },
  { name: "Victor Walker", email: "victor@example.com", role: "user" },
  { name: "Wendy Hall", email: "wendy@example.com", role: "user" },
  { name: "Xander Allen", email: "xander@example.com", role: "user" },
  { name: "Yara Young", email: "yara@example.com", role: "user" },
  { name: "Zoe Hernandez", email: "zoe@example.com", role: "admin" },
  { name: "Aaron King", email: "aaron@example.com", role: "user" },
  { name: "Bella Wright", email: "bella@example.com", role: "user" },
  { name: "Carlos Lopez", email: "carlos@example.com", role: "moderator" },
  { name: "Diana Hill", email: "diana@example.com", role: "user" },
  { name: "Ethan Scott", email: "ethan@example.com", role: "user" },
  { name: "Fiona Green", email: "fiona@example.com", role: "user" },
  { name: "George Adams", email: "george@example.com", role: "user" },
  { name: "Hannah Baker", email: "hannah@example.com", role: "user" },
  { name: "Ivan Nelson", email: "ivan@example.com", role: "user" },
];

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: USERS });
  console.log(`Seeded ${USERS.length} users.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
