const { Router } = require('express');
const cryptojs = require('crypto-js');
const router = Router();

router.post('/settings', [require('../middleware/auth')], async (req, res) => {
    const { newPassword, oldPassword } = req.body
    try {
        const currentUser = req.user

        if (cryptojs.SHA512(oldPassword).toString === currentUser.password) {
            currentUser.update({
                $set: {
                    password: newPassword
                }
            })

            return res.status(200).json({ message: 'Password successfully changed' })
        }
        res.status(405).json({ message: 'Old password does not match' })
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router