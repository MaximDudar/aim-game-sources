const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0 

startBtn.addEventListener('click', (event) => {
    event.preventDefault ()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

const clickOnCircleEvent = event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
}

board.addEventListener('click', clickOnCircleEvent)

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
         let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.remove()
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

const generateRandomColor = () => {
  return Math.floor(Math.random()*16777215).toString(16)
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNubmber(10, 60)
    const {width,height} = board.getBoundingClientRect()
    const x = getRandomNubmber(0, width - size)
    const y = getRandomNubmber(0, height - size)
    const backgroundColor = generateRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `#${backgroundColor}`

    board.append(circle)
}

function getRandomNubmber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

