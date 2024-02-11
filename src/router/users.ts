import express from 'express'

import {getAllUsers,deleteUsers,updateUsers} from '../controllers/users'
import {isAuthenticated} from '../middlewares/index'

export default(router : express.Router) =>{
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/deleteUser',isAuthenticated, deleteUsers )
    router.patch('/updateUser', isAuthenticated, updateUsers )
}

