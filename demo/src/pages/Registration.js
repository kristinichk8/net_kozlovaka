import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../auth/auth.context';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from '../api';

const Registration = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setName] = useState("");
    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const { login: userLogin } = useAuth();
    const navigate = useNavigate();

    const registration = async () => {
        await api.post("/users/signup", { headers: {'Content-Type': 'application/json'}, login, password, full_name, email, phone })
            .then((res) => {
                if (res.data.id) {
                    userLogin(res.data.id, false);
                    navigate("/papers");
                } else {
                    setError(res.data.error);
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    return (
        <div style={{ margin: "5%" }}>
            <h1 className="text-center">Регистрация</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="login" placeholder="Введите логин" required value={login} onChange={e => setLogin(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите пароль" minLength={6} title="Минимальная длина пароля - 6 символов" required value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control type="full_name" pattern="[А-Яа-яЁё\s]+" title='Используйте символы кириллицы и пробелы'
                        placeholder="Введите ФИО" required value={full_name} onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="phone" placeholder="Введите номер телефона" pattern="\+7\(\d{3}\)\d{3}-\d{2}-\d{2}"
                        title="Введите номер телефона в формате +7(XXX)XXX-XX-XX" required value={phone} onChange={e => setPhone(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Введите адрес электронной почты" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Введите корректный адрес электронной почты" required value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                {error && <div className="text-danger mb-3">{error}</div>}
                <div className="text-center">
                    <Button variant="primary" type="button" onClick={registration} style={{ backgroundColor: "#323332", border: "none" }}>
                        Зарегистрироваться
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Registration;


