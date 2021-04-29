import pool from "../connect";
import { user } from "../models/user.model";

export const getUser = async (req: any, res: any) => {
  let sql: string = `Select * from users`;
  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, (error: any, results: unknown, fields: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    let json = JSON.stringify(result);


    if (result.length != 0) {
      res.status(200);
      res.send(JSON.parse(json));
    } else {
      let resp: object = {
        status: "0",
        detail: "",
      };
      res.send(resp);
    }
  } catch (error) {
    let resp: object = {
      status: "e",
      detail: error,
    };
    res.send(resp);
  }
};

export const addUser = async (req: any, res: any) => {
  let data: user = {
    username: req.body.username,
    password: req.body.password,
  };

  let sql: string = `Insert into users set ?`;

  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, data, (error: any, results: unknown, fields: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.insertId != "") {
      res.status(200);
      res.send("Success")
    } else {
      res.status(400);
      res.send("Fail");
    }
  } catch (error) {
    let resp: object = {
      status: "e",
      detail: error,
    };
    res.send(resp);
  }
};

export const getById = async (req:any, res: any) => {
  let id:string = req.body.userID;

  let sql:string = `Select * from users where ID = '${id}'`;

  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, (error: any, results: unknown, fields: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.length != 0) {
      let resp: any = JSON.parse(JSON.stringify(result[0]))
      res.status(200);
      res.send(resp);
    } else {
      res.status(400);
      res.send('not found');
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

export const updateUser = async (req: any, res: any) => {
  let data: user = {
    id: req.body.name,
    password: req.body.password,
  };

  let sql: string = `UPDATE users SET ? WHERE username = '${data.username}' LIMIT 1`;

  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, data, (error: any, results: unknown, fields: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.affectedRows == 1) {
      res.send({ status: "1" });
    } else {
      res.send({ status: "0" });
    }
  } catch (error) {
    let resp: object = {
      status: "e",
      detail: error,
    };
    res.send(resp);
  }
};

export const login = async(req:any, res:any) => {
  let data:user = {
    username:req.body.username,
    password:req.body.password
  }

  let sql = `Select ID, username, password from users where username = '${data.username}' and password= '${data.password}'`;

  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, (error: any, results: unknown, fields: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.length != 0) {
      let resp: any = JSON.parse(JSON.stringify(result[0]))
      res.status(200);
      res.send(resp);
    } else {
      res.status(400);
      res.send('not found');
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}
