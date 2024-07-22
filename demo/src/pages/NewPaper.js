import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import axios from "axios"

import { useNavigate } from "react-router-dom";
const NewPaper = () => {
    const [reg_number, setReg_number] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    const addPaper = async () => {
        try {
            const user_id = localStorage.getItem("id")

            await axios.post("http://localhost:8080/papers/add", { user_id, reg_number, description }).then((res) => {
                if (res.status === 200)
                    navigate("/papers")
            })


        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <div style={{ margin: "5%" }}>
            <h1>Новое заявление</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Номер автомобиля</Form.Label>
                    <Form.Control type="text" placeholder="Введите номер автомобиля" value={reg_number} onChange={e => setReg_number(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Описание нарушения</Form.Label>
                    <Form.Control as="textarea" placeholder="Опишите нарушение" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>


                <Button variant="primary" type="button" onClick={addPaper} style={{ backgroundColor: "#323332", border: "none" }}>
                        Отправить
                    </Button>
            </Form>
        </div>
    )

}
export default NewPaper