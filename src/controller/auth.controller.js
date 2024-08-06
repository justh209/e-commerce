import { getUserByEmail,createUser} from '../service/user.service.js'
import {generateAccessToken,generateTokens} from '../service/jwt.service.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({ error: 'Missing email' })
    }
    if (!password) {
        return res.status(400).json({ error: 'Missing password' })
    }
    const user = await getUserByEmail(email)
    if (!user) {
        return res.status(400).json({ error: 'User does not exist' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password' })
    }
    const {accessToken, refreshToken}= generateTokens(user)
    
    return res.status(200).json({ data: { accessToken, refreshToken } })

}

export const exchangeRefreshTokenToAccessToken= async (req, res) => {
    const {refreshToken}=req.body
    if (!refreshToken) {
        return res.status(400).json({ error: 'Missing refresh token' })
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const {userId} = payload
    const user = await getUserById(userId)
    const {accessToken}= generateTokens(user)
    return res.status(200).json({ data: { accessToken,refreshToken } })}

export const register = async (req, res) => {
    const { email, password,first_name, last_name} = req.body
    if (!email) {
        return res.status(400).json({ error: 'Missing email' })
    }
    if (!password) {
        return res.status(400).json({ error: 'Missing password' })
    }
    const user = await getUserByEmail(email)
    if (user) {
        return res.status(400).json({ error: 'User already exists' })
    }

    const user1= await createUser({email: email, password: password, firstName: first_name, lastName: last_name})
    return res.status(200).json({data: user1})
}

