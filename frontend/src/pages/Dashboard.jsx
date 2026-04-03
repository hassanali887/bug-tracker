import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [bugs, setBugs] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [status, setStatus] = useState('Open')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const name = localStorage.getItem('name')
  const token = localStorage.getItem('token')

  // Fetch all bugs when page loads
  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }
    fetchBugs()
  }, [])

  const fetchBugs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bugs', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBugs(res.data)
    } catch (err) {
      setError('Failed to fetch bugs')
    }
  }

  const handleCreateBug = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/bugs',
        { title, description, priority, status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTitle('')
      setDescription('')
      setPriority('Low')
      setStatus('Open')
      fetchBugs()
    } catch (err) {
      setError('Failed to create bug')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchBugs()
    } catch (err) {
      setError('Failed to delete bug')
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bugs/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchBugs()
    } catch (err) {
      setError('Failed to update bug')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/')
  }

  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#ff6b6b'
    if (priority === 'Medium') return '#ffb347'
    return '#00d26a'
  }

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🐛 Bug Tracker</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Welcome, {name}!</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>

        {/* Summary Cards */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3 style={styles.cardNumber}>{bugs.length}</h3>
            <p style={styles.cardLabel}>Total Bugs</p>
          </div>
          <div style={styles.card}>
            <h3 style={{ ...styles.cardNumber, color: '#ff6b6b' }}>
              {bugs.filter(b => b.status === 'Open').length}
            </h3>
            <p style={styles.cardLabel}>Open</p>
          </div>
          <div style={styles.card}>
            <h3 style={{ ...styles.cardNumber, color: '#ffb347' }}>
              {bugs.filter(b => b.status === 'In Progress').length}
            </h3>
            <p style={styles.cardLabel}>In Progress</p>
          </div>
          <div style={styles.card}>
            <h3 style={{ ...styles.cardNumber, color: '#00d26a' }}>
              {bugs.filter(b => b.status === 'Resolved').length}
            </h3>
            <p style={styles.cardLabel}>Resolved</p>
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {/* Create Bug Form */}
        <div style={styles.formBox}>
          <h3 style={styles.formTitle}>Report a New Bug</h3>
          <form onSubmit={handleCreateBug}>
            <input
              style={styles.input}
              type='text'
              placeholder='Bug title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              style={{ ...styles.input, height: '80px', resize: 'none' }}
              placeholder='Bug description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div style={styles.row}>
              <select
                style={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <select
                style={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <button style={styles.submitBtn} type='submit'>
                + Add Bug
              </button>
            </div>
          </form>
        </div>

        {/* Bug List */}
        <div style={styles.bugList}>
          <h3 style={styles.formTitle}>Your Bugs</h3>
          {bugs.length === 0 && (
            <p style={{ color: '#999', textAlign: 'center' }}>
              No bugs reported yet. Add one above!
            </p>
          )}
          {bugs.map(bug => (
            <div key={bug._id} style={styles.bugCard}>
              <div style={styles.bugHeader}>
                <div style={styles.bugLeft}>
                  <span style={{
                    ...styles.priorityBadge,
                    backgroundColor: getPriorityColor(bug.priority)
                  }}>
                    {bug.priority}
                  </span>
                  <h4 style={styles.bugTitle}>{bug.title}</h4>
                </div>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(bug._id)}
                >
                  Delete
                </button>
              </div>
              <p style={styles.bugDesc}>{bug.description}</p>
              <div style={styles.bugFooter}>
                <select
                  style={styles.statusSelect}
                  value={bug.status}
                  onChange={(e) => handleStatusChange(bug._id, e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <span style={styles.bugDate}>
                  {new Date(bug.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const styles = {
  container: { backgroundColor: '#f0f4ff', minHeight: '100vh' },
  navbar: {
    backgroundColor: '#1a1a2e', padding: '16px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  logo: { color: 'white', margin: 0 },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  welcome: { color: '#aaaacc', fontSize: '14px' },
  logoutBtn: {
    backgroundColor: 'transparent', border: '1px solid #ff6b6b',
    color: '#ff6b6b', padding: '8px 16px', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px'
  },
  content: { maxWidth: '900px', margin: '0 auto', padding: '32px 16px' },
  cards: { display: 'flex', gap: '16px', marginBottom: '24px' },
  card: {
    flex: 1, backgroundColor: 'white', padding: '20px',
    borderRadius: '12px', textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)'
  },
  cardNumber: { fontSize: '32px', margin: 0, color: '#1a1a2e' },
  cardLabel: { margin: '4px 0 0', color: '#999', fontSize: '13px' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
  formBox: {
    backgroundColor: 'white', padding: '24px',
    borderRadius: '12px', marginBottom: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)'
  },
  formTitle: { margin: '0 0 16px', color: '#1a1a2e' },
  input: {
    width: '100%', padding: '12px', marginBottom: '12px',
    borderRadius: '8px', border: '1px solid #ddd',
    fontSize: '15px', boxSizing: 'border-box'
  },
  row: { display: 'flex', gap: '10px', alignItems: 'center' },
  select: {
    flex: 1, padding: '12px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '15px', backgroundColor: 'white'
  },
  submitBtn: {
    padding: '12px 20px', backgroundColor: '#4fc3f7',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '15px', cursor: 'pointer', fontWeight: 'bold'
  },
  bugList: {
    backgroundColor: 'white', padding: '24px',
    borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)'
  },
  bugCard: {
    border: '1px solid #eee', borderRadius: '10px',
    padding: '16px', marginBottom: '12px'
  },
  bugHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '8px'
  },
  bugLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  priorityBadge: {
    padding: '4px 10px', borderRadius: '20px',
    color: 'white', fontSize: '12px', fontWeight: 'bold'
  },
  bugTitle: { margin: 0, color: '#1a1a2e', fontSize: '15px' },
  deleteBtn: {
    backgroundColor: 'transparent', border: '1px solid #ff6b6b',
    color: '#ff6b6b', padding: '6px 12px', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px'
  },
  bugDesc: { color: '#666', fontSize: '14px', margin: '0 0 12px' },
  bugFooter: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  statusSelect: {
    padding: '6px 10px', borderRadius: '6px',
    border: '1px solid #ddd', fontSize: '13px', backgroundColor: 'white'
  },
  bugDate: { color: '#999', fontSize: '12px' }
}

export default Dashboard