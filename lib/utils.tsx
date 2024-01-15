import * as jwt from 'jsonwebtoken'

export const generateToken = (secretKey: string, userId: string): string => {
  const payload = {
    userId
  }

  // Options for the token
  const options: jwt.SignOptions = {
    expiresIn: '1h',
    algorithm: 'RS256'
  }

  // Sign the token with the private key
  const token: string = jwt.sign(payload, secretKey, options)

  return token
}

export const getUserIdFromToken = (token: string, publicKey: string): string | null => {
  try {
    const decoded: any = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    return decoded.userId
  } catch (error) {
    // Handle invalid or expired token
    console.error('Error decoding token:', error)
    return null
  }
}

// Example usage:
const publicKey: string = 'your_public_key_here'
const secretKey: string = 'your_secret_key_here'
const userId: string = '123456789'

const generatedToken: string = generateToken(secretKey, userId)
const decodedUserId: string | null = getUserIdFromToken(generatedToken, publicKey)

console.log(generatedToken)
console.log(decodedUserId)
