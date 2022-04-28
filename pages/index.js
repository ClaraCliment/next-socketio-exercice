import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from '../styles/Home.module.css'
let socket;

const Home = () => {
  const [input, setInput] = useState('')

  useEffect(() => {socketInitializer()}, [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      setInput(msg)
    })
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  return (
    <div className={styles.container}>
    <p className={styles.text}>What you write here will be seen by other users</p>
    <input
    className={styles.input}
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
    </div>
  )
}

export default Home;