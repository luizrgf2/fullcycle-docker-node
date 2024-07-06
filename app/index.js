const express = require('express')
const {insertPerson, selectPeople} = require('./db')


const app = express()

function createPersonList(peoples) {


    const list = peoples.map(people=>`<li>${people}</li>`)



    return list.join('\n')
}


app.listen(3000,()=>{
    console.log("api is running in port",3000)
})


app.get('/api', async (req, res)=>{
    insertPerson('Luiz')
    const peoples = await selectPeople()
    const listOfPeoples = createPersonList(peoples)


    const html = 
    `
        <h1>Full Cycle Rocks!</h1>
        <div>
            ${listOfPeoples}
        </div>
    `
    console.log(html)
    res.send(html)
})