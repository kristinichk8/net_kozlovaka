import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/auth.context';
import axios from "axios";

const Papers = () => {
    const [papers, setPapers] = useState([]);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem('id');
                if (id) {
                    console.log(id)
                    const response = await axios.get(`http://localhost:8080/papers/${id}`);
                    setPapers(response.data);

                }
                else {
                    console.log("Не авторизован")
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    return (
        <div className="table-responsive" style={{ margin: "5%" }}>
            <h1>Мои заявления</h1>
            <Button href="/newpaper" style={{ marginTop: "1%", marginBottom: "1%" }}>Оставить новое заявление</Button>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>№ п/п</th>
                            <th>Номер автомобиля</th>
                            <th>Описание нарушения</th>
                            <th>Статус заявления</th>
                        </tr>
                    </thead>
                    <tbody>
                        {papers.map((paper, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{paper.reg_number}</td>
                                <td>{paper.description}</td>
                                <td>{paper.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Papers;
