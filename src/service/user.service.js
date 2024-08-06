import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient({ log: ['query', 'info'] })

export const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return user;
};

export const createUser = async (account) => {
    console.log(account,"ABCDDD")
    const hashedPassword = bcrypt.hashSync(account.password, 12)
    const user = await prisma.user.create({
        data: {
            email: account.email,
            password: hashedPassword,
            first_name: account.firstName,
            last_name: account.lastName,
        }
    });
    const role = await prisma.role.findFirst({
        where: {
            name: "user"
        }
    })
    const userRole = await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: role.id,
        }
    })
    return user;
}