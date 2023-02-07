import  { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const res=axios.get('http://localhost:3500/api/routes/leetcode')
    setData(res.data)
    console.log(res.data)
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default App
