import express , {Request,Response} from 'express'

import {getUsers, deleteUserById, getUserById} from '../db/users'



export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await getUsers()
        return res.status(200).json(users)

    }catch(error){
        console.log(error)
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    try{
        const id = req.query.id;
        const idString = id.toString()
        const user = await deleteUserById(idString)
        return res.status(200).json({"User Deleted" : user})


    }catch(error){
        console.log(error)
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.sendStatus(400);
        }

        const idString = id.toString();
        const user = await getUserById(idString);
        if (!user) {
            return res.sendStatus(404); // Assuming user not found should return 404
        }

        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400).json({ error: 'Username is required' });
        }

        user.username = username;
        await user.save();

        return res.status(200).json({ message: "User Updated", user });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // Internal Server Error
    }
}