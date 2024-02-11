import express, {Request,Response} from 'express'
import {createUser, getUserByEmail} from "../db/users";

import {random , authentication} from "../helpers";

export const login = async(req: Request, res: Response):Promise<Response> => {
    try{
        const {email, password} = req.body
        if (!email || !password) {
            return res.sendStatus(400)
        }

        const user = await getUserByEmail(email).select('+authentication.salt + authentication.password')
        if (!user){
            return res.sendStatus(400)
        }

        const expectedHash = authentication(user.authentication.salt, password)
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(400);

        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt,user._id.toString());
        await user.save();

        res.cookie('Neel-Auth', user.authentication.sessionToken,{domain: 'localhost', path : '/'})

        return res.status(200).json(user).end()


    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
}

export const register = async (req: Request, res: Response):Promise<Response> => {
    try{
        const {email , password, username} = req.body;
        if(!email || !password || !username){
            return res.status(400).send("Please provide a valid email or password or username")
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.sendStatus(400)
        }

        const salt = random()

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password : authentication(salt,password)

            },

        })
        return res.status(200).json(user).end()


    }catch(error){
        console.log(error)
        return res.status(400).send("Error")
    }
}