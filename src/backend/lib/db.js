import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('newsportal', 'root','',
    {
        host : 'localhost',
        dialect : 'mysql'
    }
)

export default sequelize;