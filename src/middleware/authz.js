import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query', 'info'] })

const authz = (requiredPermissions) => async (req, res, next) => {
    const {userId} = req.user;
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            userRole: {
                include: {
                    role: true
                }
            }
        }
    })
   
    const allPermissions = []

    for (let i = 0; i < user.userRole.length; i++) {
        allPermissions.push(user.userRole[i].role.permission)
    }

    const allPermissionsFomated = allPermissions.join('')

    const matchPermissions = requiredPermissions.filter((e) => {
        if (allPermissionsFomated.includes(e)) {
            return true
        }
    })

    if (matchPermissions.length > 0) {
        next()
        return
    }

    res.status(403).json({
        message: 'You are not authorized to access this resource'
    })
}
export default authz;