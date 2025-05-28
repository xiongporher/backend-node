import express from 'express';
import { deleteUser, editUser, getUser, getUsers } from '../controller/user.controller.js';
import { login, register } from '../controller/auth.controller.js';


const route = express.Router();

// route user
route.post("/user/create", register);
route.post("/login", login);

route.get("/getUser/:id", getUser);

route.get("/getUsers", getUsers);

route.put("/user/update/:id", editUser);

route.delete("/user/delete/:id", deleteUser)





export default route;