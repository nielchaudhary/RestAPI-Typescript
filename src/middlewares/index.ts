import express, {Request,Response} from 'express'

import { merge } from 'lodash'


import {getUserBySessionToken} from "../db/users";

export const isAuthenticated = async(req:Request,res:Response, next : express.NextFunction)=>{
    try{
        const sessionToken = req.cookies['Neel-Auth']
        if(!sessionToken){
            res.sendStatus(400)
        }
        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser){
            res.sendStatus(400)
        }

        merge(req,{identity : existingUser})
        next();


    }catch(error){
        console.log(error)
    }
}
