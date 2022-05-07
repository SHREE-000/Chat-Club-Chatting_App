const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postLogin = async(req,res) => {
    try {
        const {mail, password} = req.body
        const user = await User.findOne({mail : mail.toLowerCase() })
        if(user && (await bcrypt.compare(password, user.password))){
            
  
            // Send new token
            const token = jwt.sign(
                {
                    userId : user._id,
                    mail
                },
                process.env.JWT_SECRET_KEY
            )

            return res.status(200).json({
                userDetails : {
                    mail : user.mail,
                    token : token,
                    username : user.username
                }
            })
        }
        res.status(400).send('Invalid Credential, please try again later')
    } catch (error) {
        res.status(500).send('Something went wrong. Please try again later')
    }
}

module.exports = postLogin;