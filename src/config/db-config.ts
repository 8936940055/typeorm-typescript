
import {DataSource} from 'typeorm';
import { User } from '../entity/user';
import { Todos } from '../entity/todos';
require('dotenv').config();
export const dataS = new DataSource({
    type:'mysql',
    host:'127.0.0.1',
    port:3306,
    username:'root',
    password: 'Shid@1998',
    database: "demo",
    synchronize: true,
    entities:[User,Todos],
    logging : true
})

