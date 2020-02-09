const { Router } = require('express');
const User = require('../models/user')
const router = Router();

// получение списка групп
router.get('/', async (req, res) => {
    // req.user - хранить в себе User, см в /middleware/auth.js

    try {
        const currentUser = req.user

        const user = currentUser.populate('groups.members')

        res.status(200).json({groups: user.groups})

    } catch (error) {
        res.status(400).json({ error })
    }
})

// создание группы
router.put('/', async (req, res) => {
    const { name } = req.body

    try {
        const currentUser = req.user

        await currentUser.update({
            $addToSet: {
                groups: {
                    name
                }
            }
        })

        res.status(200).json({ message: 'Group successfully added'})

    } catch (error) {
        res.status(400).json({ error })
    }
})

// добавление участников группы
router.put('/members', async (req, res) => {
    const { member_id, group_id } = req.body

    try {
        const currentUser = req.user // user model, check middleware/auth.js
        currentUser.update(
            {
                "groups._id": group_id
            },
            {
            $addToSet: {
                members: member_id
            }
        })

        res.status(200).json({ message: `Member added to group` })
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router;