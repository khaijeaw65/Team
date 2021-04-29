import pool from "../connect";
import { topic } from "../models/topic.model";

export const createTopic = async (req: any, res: any) => {
  let data: topic = {
    name: req.body.topicName,
    createAt: req.body.postDate,
    teamID: req.body.teamID,
  };

  console.log(data);

  let sql: string = `Insert into topics set ?`;

  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, data, (error: any, results: any, fields: any) => {
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

export const getTopic = async (req: any, res: any) => {
  let teamID:string = req.body.teamID;

  let sql: string = `SELECT * from topics	Where teamID = '${teamID}'`;

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
      let resp = {
        status: "0",
        detail: "",
      };
    }
  } catch (error) {
    let resp: object = {
      status: "e",
      detail: error,
    };
    res.send(resp);
  }
};

