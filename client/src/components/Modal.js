import { useState } from "react"
import { useCookies } from "react-cookie"

const Modal =
    ({mode, setShowModal, getData, task}) => {
        const [cookies, setCookie, removeCookie] = useCookies(null)
        const editMode = mode === 'edit' ? true : false

        const [data, setData] = useState({
            user_email: editMode ? task.user_email : cookies.Email,
            // user_email: 'ania@test.com',
            title: editMode ? task.title : null,
            progress: editMode ? task.progress : 50,
            date: editMode ? task.date : new Date()
        })

        const postData = async (e) => {
            e.preventDefault()
            console.log(`post user email = ${data.user_email}`)
            try {
                // const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
                const response = await fetch(`http://localhost:8001/todos`, {
                    method: "POST",
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(data)
                })
                if (response.status === 200) {
                    console.log('WORKED')
                    setShowModal(false)
                    getData()
                }
            } catch (error) {
                console.log(error)
            }
        }

        const editData = async(e) => {
            e.preventDefault()
            console.log(`update user email = ${data.user_email}`)
            try {
                // const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
                const response = await fetch(`http://localhost:8001/todos/${task.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(data)
                })
                if (response.status === 200) {
                    setShowModal(false)
                    getData()
                }
            } catch (error) {
                console.log(error)
            }
        }


        const handleChange = (e) => {
            const { name, value } = e.target

            setData(data => ({
                ...data,
                [name] : value
            }))

            console.log(data)
        }
        
        return (
            <div className="overlay">
                <div className="modal">
                    <div className="form-title-container">
                        <h3>Let's {mode} your task</h3>
                        <button onClick={() => setShowModal(false)}>X</button>
                    </div>

                    <form>
                        <input 
                        required
                        maxLength={30}
                        placeholder="Your task goes here"
                        name="title" 
                        value={data.title}
                        onChange={handleChange}/>

                        <br />
                        <label for="range">Drag to select your current progress</label>
                        
                        <input 
                        required
                        type="range"
                        id="range"
                        min="0"
                        max="100"
                        name="progress" 
                        value={data.progress}
                        onChange={handleChange}/>
                        <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
                    </form>
                </div>
            </div>
        )
    }

export default Modal
