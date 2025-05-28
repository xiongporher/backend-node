import dbExecute from "../db/db.js";

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(422).json({
      resultCode: 422,
      message: "Empty id",
    });
  }

  try {
    const result = await dbExecute("SELECT * FROM tbusers WHERE id = ?", [id]);

    if (!result) {
      return res.status(404).json({
        resultCode: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      resultCode: 200,
      message: "Successfully get users",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      resultCode: 500,
      message: "server error",
    });
  }
};

export const getUsers = async (req, res) => {
  let filter = "";

  try {
    const search = req.qeury?.search;

    if (search) {
      filter = ` AND (username LIKE '%${search}%' OR role LIKE '${search}%')`;
    }

    const sql = "SELECT * FROM tbusers WHERE 1" + filter;
    const params = [];
    const data = await dbExecute(sql, params);

    if (!data) {
      return res.status(404).json({
        resultCode: 404,
        message: "Users not found",
      });
    }
    return res.status(200).json({
      resultCode: 200,
      message: "Successfully get users",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      resultCode: 500,
      message: "server error",
    });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  if (!id) {
    return res.status(422).json({
      resultCode: 422,
      message: "Emty id",
    });
  }

  if (!username || !password || !role) {
    return res.status(422).json({
      resultCode: 422,
      message: "Operation field",
    });
  }

  try {
    const sql = "UPDATE tbusers SET username=?, password=?, role=? WHERE id=?";
    const params = [username, password, role, id];
    const data = await dbExecute(sql, params);

    if (!data) {
      return res.status(422).json({
        resultCode: 422,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      resultCode: 200,
      message: "Operation success",
    });
  } catch (error) {
    return res.status(500).json({
      resultCode: 500,
      message: "Server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(422).json({
      resu: 422,
      message: "Emty id",
    });
  }

  try {
    const result = await dbExecute("DELETE FROM tbusers WHERE id=?", [id]);

    if (!result) {
      return res.status(422).json({
        resultCode: 422,
        message: "Operation field",
      });
    }

    return res.status(200).json({
      resultCode: 200,
      message: "Operation success",
    });
  } catch (error) {
    return res.status(500).json({
      resultCode: 500,
      message: "Server error",
    });
  }
};
