const express = require('express')
const router = express.Router();
const cryptojs = require('crypto-js')
const User = require('../models/user')

router.post('/register', async (req, res) => {
    // регистрация, необходимые данные - имя логин пароль
    const { name, login, password } = req.body
    try {
        const curentUser = await User.findOne({ login })
        if (curentUser) {
            return res.status(400).json({ message: 'This login alredy exsist' })
        }

        const hashedPassword = cryptojs.SHA512(password).toString()

        const newUser = new User({ login, name, password: hashedPassword })

        await newUser.save()

        // при успешной регистрации возвращает 201-ый статус со следущим сообщением  
        res.status(201).json({ message: 'You have been succesfully registred' })
    } catch (error) {
        console.log(error)

        res.status(500).json({ error })
    }
})


router.post('/login', async (req, res) => {
    const { login, password } = req.body
    try {
        const currentUser = await User.findOne({ login })

        if (!currentUser) {
            return res.status(404).json({ message: 'User with this login not found' })
        }

        if (currentUser.password === cryptojs.SHA512(password).toString()) {
            return res.status(302).json({ access_token: currentUser.token.value })
        }

        res.status(403).json({ message: 'Wrong password' })

    } catch (error) {
        res.status(400).json({ error })
    }
})
module.exports = router