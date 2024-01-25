import jwt from 'jsonwebtoken'

export const gererateToken = (userId) => { 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" })
    return token;
}

export const getUserIdFromToken = (token) => {
const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
return decodedToken.userId;
}

