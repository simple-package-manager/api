import {
    Sequelize,
    DataTypes,
} from 'sequelize';

export interface UserAttributes {
    username ? : string;
    email ? : string;

}

export interface UserInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    username: string;
    email: string;

}

export default (sequelize: Sequelize, DT: typeof DataTypes) => {
    const User = sequelize.define('User', {
        username: DT.STRING,
        email: DT.STRING
    });

    return User;
};
