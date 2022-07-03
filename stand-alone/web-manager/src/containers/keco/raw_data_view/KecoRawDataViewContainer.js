import React, { useState, useEffect } from 'react'
import './UnlimitedScroll.css'

export default () => {
    const [stations, setStations] = useState([])
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const request = await fetch(`/stationsRouter/find/keco/raw/all?skip=${skip}`)
                const stationsJson = await request.json()
                setStations([...stations, ...stationsJson])
            } catch (e) {

            }
        }

        fetchTodos()

    }, [skip])

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target

        if (offsetHeight + scrollTop === scrollHeight) {
            setSkip(stations.length)
        }
    }

    return (
        <div className="todos-list" onScroll={handleScroll}>
            {stations.map((todo) => {
                return (
                    <div className='card' key={todo._id}>
                        <div className=''>{todo.statNm}</div>
                        <div className=''>{todo.addr}</div>
                    </div>
                    // <div className="todo" key={todo._id}>
                    //     <p className="todo-title">{todo.statNm}</p>
                    //     <p className="todo-description">{todo.addr}</p>
                    // </div>
                )
            })}
        </div>
    )
}