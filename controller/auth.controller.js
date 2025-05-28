import dbExecute from "../db/db.js";


export const register = async(req, res) => {
    const {username,password,role} = req.body;

    if(!username || !password || !role){
        return res.status(422).json({
            resultCode: 422,
            message: "Operation is required",
        })
    }

    try {
        const sql = "INSERT INTO tbusers(username,password,role) VALUES(?,?,?)"
        const params = [username,password,role];
        const data = await dbExecute(sql, params);

        if(!data){
            return res.status(422).json({
            resultCode: 422,
            message: "Invalid data",
        })
        }

        return res.status(201).json({
            resultCode: 201,
            message: "Operation success",
        })
    } catch (error) {
        return res.status(500).json({
            resultCode: 500,
            message: "server error",
        })
    }
}

export const login = async(req, res) => {
    const {username,password} = req.body;

    if(!username || !password){
        return res.status(422).json({
            resultCode: 422,
            message: "Data not found",
        })
    }

    try {
        const data = await dbExecute("SELECT * FROM tbusers WHERE username = ?", [username])

        if(!data){
            return res.status(422).json({
            resultCode: 422,
            message: "Invalid username or password",
        })
        }

        for(let i = 0; i < data.length; i++){
            const isValid = password === data[i].password;
            if(isValid){
                return res.status(200).json({
                    resultCode: 200,
                    message: "Login successful",
                })

            }
        }
        return res.status(422).json({
            resultCode: 422,
            message: "User not found",
        })
    } catch (error) {
        return res.status(500).json({
            resultCode: 500,
            message: "server error",
        })
    }

}