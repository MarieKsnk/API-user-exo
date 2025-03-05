import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {

  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const fetchAPI = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8000/api/users')
      setUsers(response.data)
    } 
    catch(err) {
      console.log(err.message)
      setError(err.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  if (loading) return <h1>Chargement...</h1>
  if (error) return <h1>{error}</h1>
  return (
    <>
    {users && !loading && users.map(user => {
      return (
        <div key={user.id}>
          <h3>Prenom : {user.firstName}</h3>
          <h3>Nom : {user.lastName}</h3>
          <h3>Tel : {user.telephone}</h3>
          <h3>Adresse : {user.address}</h3>
          <h3>hobbies : {user.hobbies}</h3>
        </div>
      )
    })}
    </>
  )
}

export default App
