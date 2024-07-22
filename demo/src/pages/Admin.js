import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from "axios"
const Admin = () => {
    const [papers, setPapers] = useState([])
    const fetchData = async () => {
        try {
            const isAdmin = localStorage.getItem('isAdmin');
            if (isAdmin === "true") {
                const response = await axios.get("http://localhost:8080/papers/all")
                setPapers(response.data);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {


        fetchData();
    }, [papers]);

    const accept = (paper_id) => {
        axios.post("http://localhost:8080/papers/update", { paper_id, status: "Подтверждено" })
        fetchData()
    }
    const cancel = (paper_id) => {
        axios.post("http://localhost:8080/papers/update", { paper_id, status: "Отклонено" })
        fetchData()
    }



    return (
        <div style={{ margin: "5%" }}>
            <h1>Все заявления</h1>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>№ п/п</th>
                            <th>ФИО подавшего</th>
                            <th>Номер автомобиля</th>
                            <th>Описание нарушения</th>
                            <th>Статус заявления</th>
                        </tr>
                    </thead>
                    <tbody>
                        {papers.map((paper, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{paper.user_id}</td>
                                <td>{paper.reg_number}</td>
                                <td>{paper.description}</td>
                                <td>{paper.status}
                                    <br />
                                    {paper.status === "Новое" && (
                                        <>
                                            <Button variant="success" onClick={() => accept(paper.id)} style={{ marginRight: "1%" }}>Подтвердить</Button>

                                            <Button variant="danger" onClick={() => cancel(paper.id)}>Отклонить</Button></>)}

                                </td>

                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        </div>
    )

}
export default Admin