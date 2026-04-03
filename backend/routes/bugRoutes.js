const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug
} = require('../controllers/bugController')

// All routes below are protected, must have valid JWT token
router.get('/', protect, getBugs)
router.get('/:id', protect, getBug)
router.post('/', protect, createBug)
router.put('/:id', protect, updateBug)
router.delete('/:id', protect, deleteBug)

module.exports = router
