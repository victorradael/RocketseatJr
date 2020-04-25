const express = require('express')
const njk = require('nunjucks')

const courses = require('./data')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

njk.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render('initial')
})

server.get("/about", (req, res) => {
    return res.render('about')
})

server.get("/courses", (req, res) => {
    return res.render('courses', { items: courses })
})

server.get(`/courses/:id`, (req, res) => {
    const { id } = req.params;

    const course = courses.find( course => {
        return course.id == id
    })

    if(!course) {
        return res.render('not-found')
    }

    return res.render('course', {item: course})
})

server.listen(5000, _ => {
    console.log('Server is Running')
})