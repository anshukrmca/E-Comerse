import jwt from 'jsonwebtoken'

const SECRET_KEY ="tnempolevedbewevoli"
export const gererateToken = (userId) => { 
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "2h" })
    return token;
}

export const getUserIdFromToken = (token) => {
const decodedToken = jwt.verify(token,SECRET_KEY)
return decodedToken.userId;
}

