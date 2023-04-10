import User from "../models/user";
import Joi from "joi"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { object, string, number } from 'yup'

const salt = bcrypt.genSaltSync(10)

const userSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
        "string.min" : "Mat khau khong hop le",
        "string.empty" : "Truong du lieu bat buoc"
    }),
    confirmPassword: Joi.ref('password')
})

export const signup = async (req, res) => {
    try{
        const body = req.body
        const {error} = userSchema.validate(body)
        if(error){
            res.status(400).send({
                message: error.details[0].message
            })
        } else{
            const hash = bcrypt.hashSync(body.password, salt)
            const data = await User.create({...body, password: hash})
            res.send({
                message: "Dang ki thanh cong",
                data: data
            })
        }
    }catch(err){
        res.status(500).send({
            message: err
        })
    }
}

const userSigninSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const signin = async (req, res) => {
    try{
        const body = req.body
        const {error} = userSigninSchema.validate(body)
        // Validate
        if(error){
            return res.status(400).send({
                message: error.details[0].message
            })
            // res.end()
        }
        const user = await User.findOne({ email:body.email})
        if(!user){
            return res.status(400).send({
                message: "Ten dang nhap hoac mat khau sai"
            })
        }
        const isValidate = bcrypt.compareSync(body.password, user.password)
        if(!isValidate){
            return res.status(400).send({
                message: "Ten dang nhap hoac mat khau sai"
            })
        }
        const accessToken = jwt.sign({_id: user._id}, "we17317", {expiresIn: "5m"})
        res.send({
            message: "Dang nhap thanh cong",
            data: {
                user,
                accessToken
            }
        })
           // if (error) {
        //     res.status(400).send({
        //         message: error.details[0].message
        //     })
        // } else {
        //     const user = await User.findOne({email: body.email})
        //     console.log(user);
        //     if(user) {
        //         if(bcrypt.compareSync(body.password, user.password)) {
        //             res.send({
        //                 message: "Đăng nhập thành công"
        //             }) 
        //         } else {
        //             res.status(400).send({
        //                 message: "Tên đăng nhập hoặc mật khẩu sai"
        //             })  
        //         }
        //     } else {
        //         res.status(400).send({
        //             message: "Tên đăng nhập hoặc mật khẩu sai"
        //         })  
        //     }
        // }
    }catch(err){
        res.status(500).sen({
            message: err
        })
    }
}