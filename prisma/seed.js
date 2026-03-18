import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'developer@cv.com' },
    update: {},
    create: {
      email: 'developer@cv.com',
      password: 'developer',
      role: 'super_admin',
      firstName: 'System',
      lastName: 'Developer'
    },
  })
  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
