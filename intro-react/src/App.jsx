import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {

  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [telephone, setTelephone] = useState("")
  const [address, setAddress] = useState("")
  const [hobbies, setHobbies] = useState([])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const addNewUser = await axios.post(`http://localhost:8000/api/users`, {firstName, lastName, telephone, address, hobbies})
     
    }
    catch(err){
      console.log(err)
    }
    finally{
      fetchAPI()
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
          <h2>Prenom : {user.firstName}</h2>
          <h4>Nom : {user.lastName}</h4>
          <h4>Tel : {user.telephone}</h4>
          <h4>Adresse : {user.address}</h4>
          <h4>hobbies : {user.hobbies.join(", ")}</h4>
        </div>
      )
    })}

    <form action="POST" onSubmit={handleSubmit}>
      <input type="text" placeholder="prenom" required onChange={e => setFirstName(e.target.value)} />
      <input type="text" placeholder="nom" required onChange={e => setLastName(e.target.value)} />
      <input type="text" placeholder="tel" required onChange={e => setTelephone(e.target.value)} />
      <input type="text" placeholder="adresse" required onChange={e => setAddress(e.target.value)} />
      <input type="text" placeholder="hobbies" required onChange={e => setHobbies(e.target.value.split(","))} />
      <input type="submit"/>
    </form>
    </>
  )
}

export default App
