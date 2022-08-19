import axios from 'axios';
import { useState } from 'react/cjs/react.development';


function Board() {
    const [data, setData] = useState([])
    async function result() {
        await axios.get(`http://localhost:3001/players`)
            .then(res => {
                setData(res.data)
            })
    }

    result();
    return (
        <div id='notice'>
            <h2>LEADER BOARD</h2>
            <table>
                <tr>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Turns</th>
                </tr>
                {data.map((value) =>
                    <tr>
                        <td>{value.p1}</td>
                        <td>{value.p2}</td>
                        <td>{value.turns}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default Board;