import { useEffect, useState } from "react"
import { USERS } from "../../Api/Api"
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get(`/${USERS}`)
        .then((data) => setUsers(data.data))
        .catch((err) => console.log(err))
    }, []);

    const usersShow = users.map((user, key) => (
        <tr key={key}>
            <td>{key + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <div className="d-flex align-items-center gap-2">
                    <Link to={`${user.id}`}><FontAwesomeIcon fontSize={'19px'} icon={faPenToSquare} /></Link>
                    <FontAwesomeIcon onClick={handleDelete} fontSize={'19px'} color="red" icon={faTrash} />
                </div>
            </td>
        </tr>
    ));

    // Handle Delete
    function handleDelete() {
        
    }

    return (
        <div className="bg-white w-100 p-2">
            <h1>Users Page</h1>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {usersShow}
            </tbody>
            </Table>
        </div>
    )
  }