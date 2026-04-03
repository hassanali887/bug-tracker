const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  let token

  // Check if token exists in request headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from "Bearer eyJhbGci..."
      token = req.headers.authorization.split(' ')[1]

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Attach user ID to the request object
      req.user = decoded

      next() // Move on to the actual route

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

module.exports = protect