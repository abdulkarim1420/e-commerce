import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TableShow(props) {

    const currentUser = props.currentUser || {
        name: '',
    };

    // Header Show
    const headerShow = props.header.map((item, key) => <th key={key}>{item.name}</th>);
    
    // Body Show
    const dataShow = props.data.map((item, key) => 
    <tr key={key}>
        <td>{key + 1}</td>
        {props.header.map((item2, key2) => <td key={key2}>{
        // Show Image
        item2.key === 'image' ? <img src={item[item2.key]} alt="image" width="100" />
        : item2.key === 'images' ? item[item2.key].map((img) => <img src={img.image} alt="image" width="50" />)
        : item[item2.key] === '1995' ? "admin"
        : item[item2.key] === "2001" ? "User"
        : item[item2.key] === "1996" ? "Writer"
        : item[item2.key] === "1999" ? "Product Manager" : item[item2.key]
        }
        </td>)}
        <td>
            <div className="d-flex align-items-center gap-2">
                <Link to={`${item.id}`}><FontAwesomeIcon fontSize={'19px'} icon={faPenToSquare} cursor={'pointer'} /></Link>
                {currentUser.name !== item.name &&
                (<FontAwesomeIcon 
                onClick={() => props.delete(item.id)}
                 fontSize={'19px'} color="red" icon={faTrash} cursor={'pointer'} />)}
            </div>
        </td>
    </tr>)

    // Return Data
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    {headerShow}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {props.data.length === 0 && 
                <tr>
                    <td colSpan={12} className="text-center">Loading...</td>
                </tr>
            }
                {dataShow}
            </tbody>
        </Table>
    )
  }