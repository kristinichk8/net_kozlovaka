import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useState } from 'react';
import { useAuth } from '../auth/auth.context';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Authorization = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { login: userLogin } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const auth = () => {
        axios.post("http://localhost:8080/users/signin", { headers: {"mode": "no-cors"}, login, password })
            .then((res) => {
                if (res.data.id) {
                    userLogin(res.data.id, res.data.isAdmin);
                    navigate("/papers");
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Ошибка авторизации. Пожалуйста, проверьте правильность введенных данных.");
            });
    };

    return (
        <div style={{ margin: "5%" }}>
            <h1 className="text-center">Авторизация</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="login" placeholder="Введите логин" required value={login} onChange={e => setLogin(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите пароль" required value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                {error && <div className="text-danger mb-3">{error}</div>}
                <div className="text-center">
                    <Button variant="primary" type="button" onClick={auth} style={{ backgroundColor: "#323332", border: "none" }}>
                        Войти
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Authorization;

