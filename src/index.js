import React from 'react';
import './index.css';
import ReactDOM from 'react-dom'
import { useState } from 'react';
import axios from 'axios';
import Board from './board.js';

const numbers = [
	{
		id: 1,
		value: '',
	},
	{
		id: 2,
		value: '',
	},
	{
		id: 3,
		value: '',
	},
	{
		id: 4,
		value: '',
	},
	{
		id: 5,
		value: '',
	},
	{
		id: 6,
		value: '',
	},
	{
		id: 7,
		value: '',
	},
	{
		id: 8,
		value: '',
	},
	{
		id: 9,
		value: '',
	},
]

function Xox() {
	const [count, setCount] = useState(1)
	const [touched, setTouched] = useState(numbers)
	const [stat, setStat] = useState({ status: false, value: '' })
	const [win, setWin] = useState(0)

	function checkStat() {
		if (touched[0].value === touched[3].value ? touched[3].value === touched[6].value ? true : false : false)
			setStat({ status: true, value: touched[0].value })
		else if (touched[0].value === touched[1].value ? touched[1].value === touched[2].value ? true : false : false)
			setStat({ status: true, value: touched[0].value })
		else if (touched[0].value === touched[4].value ? touched[4].value === touched[8].value ? true : false : false)
			setStat({ status: true, value: touched[0].value })
		else if (touched[1].value === touched[4].value ? touched[4].value === touched[7].value ? true : false : false)
			setStat({ status: true, value: touched[1].value })
		else if (touched[3].value === touched[4].value ? touched[4].value === touched[5].value ? true : false : false)
			setStat({ status: true, value: touched[3].value })
		else if (touched[2].value === touched[4].value ? touched[4].value === touched[6].value ? true : false : false)
			setStat({ status: true, value: touched[2].value })
		else if (touched[2].value === touched[5].value ? touched[5].value === touched[8].value ? true : false : false)
			setStat({ status: true, value: touched[2].value })
		else if (touched[6].value === touched[7].value ? touched[7].value === touched[8].value ? true : false : false)
			setStat({ status: true, value: touched[6].value })
	}

	function clicked(e) {
		if (count < 9) {
			if (count % 2 === 1) {
				setTouched([...touched.map((val) => {
					if (e.target.id === val.id.toString())
						val.value = 'X'
					return val
				})])
			}
			else {
				setTouched([...touched.map((val) => {
					if (e.target.id === val.id.toString())
						val.value = 'O'
					return val
				})])
			}
			if (count >= 5) {
				checkStat();
			}
			setCount(count + 1)
		}
		else {
			setWin(1)
		}
	}

	function start() {
		setTouched([...touched.map((val) => {
			val.value = ''
			return val
		})])
		setCount(1)
		setStat({ status: false, value: '' })
		setWin(0)
	}

	async function post() {
		let p1 = window.prompt('Enter Player 1 name for records')
		let p2 = window.prompt('Enter Player 2 name for records')
		await axios.post(`http://localhost:3001/players`, {
			"p1": p1,
			"p2": p2,
			"turns": count
		}).then((res, data) =>
			console.log('Posted')
		)
	}

	if (stat.status) {
		if (stat.value !== '') {
			post()
			return (
				<div className='parent'>
					<div className='players'>
						<button>PLAYER 1 : X</button>
						<button>PLAYER 2 : O</button>
					</div>
					<div className='container'>
						<p>{stat.value} wins</p>
					</div>	<br />
					<button onClick={start}>NEW GAME</button>
					<Board />
				</div>
			)
		}
		else {
			post()
			return (
				<div className='parent'>
					<div className='players'>
						<button>PLAYER 1 : X</button>
						<button>PLAYER 2 : O</button>
					</div>
					<div className='container'>
						<p>You missed a crucial chance to win and <br />It ends as DRAW..</p>
					</div>	<br />
					<button onClick={start}>NEW GAME</button>
					<Board />
				</div>
			)
		}
	}
	else {
		if (win === 0) {
			return (
				<div className='parent'>
					<div className='players'>
						<button>PLAYER 1 : X</button>
						<button>PLAYER 2 : O</button>
					</div>
					<div className='container'>
						{touched.map((val) =>
							<div id={val.id} onClick={clicked} key={val.id}>{val.value}</div>
						)}
					</div>	<br />
					<button onClick={start}>NEW GAME</button>
					<Board />
				</div>
			)
		}
		else {
			post()
			return (
				<div className='parent'>
					<div className='players'>
						<button>PLAYER 1 : X</button>
						<button>PLAYER 2 : O</button>
					</div>
					<div className='container'>
						<p>Nobody wins <br /> DRAW ..<br /> Better luck next time.</p>
					</div>	<br />
					<button onClick={start}>NEW GAME</button>
					<Board />
				</div>
			)
		}
	}
}

ReactDOM.render(
	<Xox />, document.querySelector('#root')
)
