const Bug = require('../models/Bug')

// GET all bugs for logged in user
const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({ createdBy: req.user.id })
    res.status(200).json(bugs)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET single bug by ID
const getBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' })
    }

    res.status(200).json(bug)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// POST create a new bug
const createBug = async (req, res) => {
  const { title, description, priority, status } = req.body

  try {
    const bug = await Bug.create({
      title,
      description,
      priority,
      status,
      createdBy: req.user.id
    })

    res.status(201).json(bug)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT update a bug
const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' })
    }

    const updatedBug = await Bug.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json(updatedBug)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE a bug
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' })
    }

    await Bug.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Bug deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getBugs, getBug, createBug, updateBug, deleteBug }