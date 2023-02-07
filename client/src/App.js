import React, { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    const res=axios.get('http://localhost:3500/api/routes/leetcode')
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default App
