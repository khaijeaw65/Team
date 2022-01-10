import pool from "../connect";
import { comment } from "../models/comment.model";

export const getComment: any = async (req: any, res: any) => {
  let sql: string = `Select id, detail, createAt, topicID from comments where topicID = '${req.body.topicID}'`;

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
      let resp: any = JSON.parse(json);
      res.status(200);
      res.send(resp);
    } else {
      res.status(400);
      res.send("not found");
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export const createComment: any = async (req: any, res: any) => {
  let data: comment = {
    topicID: req.body.topicID,
    detail: req.body.detail,
    createAt: req.body.date,
  };

  let sql: string = `Insert into comments set ?`;

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
      res.send("Success");
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
