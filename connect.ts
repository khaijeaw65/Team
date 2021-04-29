import mysql from 'mysql';

let pool:any = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tcom'
});

export default pool
