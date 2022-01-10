import pool from "../connect";
import { team } from "../models/team.model";

export const getTeam: any = async (req: any, res: any) => {
  let sql: string = `Select ID, name , teams.key as teamKey from teams`;

  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, (error: any, results: object, fields: any) => {
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
    let resp = {
      status: "e",
      detail: error,
    };
    res.send(error);
  }
};
export const createTeam: any = async (req: any, res: any) => {
  let data: any = {
    name: req.body.teamName,
    key: req.body.teamKey,
    status: 1,
  };

  let sql: string = `Insert into teams set ?`;

  try {
    const result: any = new Promise((resolve, reject) => {
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
    res.status(503);
    res.send("Server issues");
  }
};
export const getTeamKey: any = async (req: any, res: any) => {
  let sql: string = `Select teams.key as teamKey from teams`;

  try {
    const result: any = await new Promise((resolve, reject) => {
      pool.query(sql, (error: any, results: object, fields: any) => {
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
    let resp = {
      status: "e",
      detail: error,
    };
    res.send(error);
  }
};
