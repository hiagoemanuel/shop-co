import { prisma } from '@/lib/prisma'

export async function GET() {
  const data = await prisma.product.findMany()
  return Response.json({ data })
}
