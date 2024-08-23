import * as api from './api.js'

const singleButton = document.getElementById('singleaircraft')
const multiButton = document.getElementById('multiaircraft')

singleButton.addEventListener('click', async() => {
        const singleResponse = await api.fetchSingleClosestAircraft()
        console.log(singleResponse)
})

multiButton.addEventListener('click', async() => {
    const multiResponse = await api.multipleClosestAircraft()
    for (let x = 0; x < multiResponse.ac.length; x++) {
        console.log(multiResponse.ac[x]?.flight)
    }
})