import express from 'express'
import {login,register,exchangeRefreshTokenToAccessToken} from '../controller/auth.controller.js'

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/register', register)
router.post('/refresh-tokens/exchange',exchangeRefreshTokenToAccessToken)

export default router