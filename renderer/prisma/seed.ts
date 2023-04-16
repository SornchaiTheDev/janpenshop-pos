import { PrismaClient } from '@prisma/client'
import { fakeData } from '../src/utils/fakeItem'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  fakeData(100).forEach(async (item) => {
    const tag = await prisma.tag.upsert({
      where: { name: item.tag },
      update: {},
      create: {
        name: item.tag,
      },
    })

    await prisma.stocks.upsert({
      where: { barcode: item.barcode },
      update: {},
      create: {
        barcode: item.barcode,
        name: item.name,
        tags: {
          connect: { id: tag.id },
        },
        retailPrice: item.retailPrice,
        wholesalePrice: item.wholesalePrice,
      },
    })
  })

  await prisma.users.create({
    data: {
      username: 'admin',
      password: bcrypt.hashSync('admin', 10),
    },
  })
}

main()
  .then(() => {
    console.log('🌱 Seed Success!')
  })
  .catch((e) => {
    console.log('❌ Seed Failed!')
  })
