import {createPool} from 'mysql2/promise';

const connection = createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'equipo3',
    port: 3306
});

 export { connection };