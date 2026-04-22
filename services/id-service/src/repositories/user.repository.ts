import pool from '#config/databasePool';
import { UserData, UserDataRow } from '@slnd/shared';
import * as crypto from 'crypto';

const createUUID: () => string = () => {
    let uuid: string = 'slnd';
    for (let i = 0; i < 3; i++) {
        const fragment: string = crypto.randomBytes(8).toString('hex');
        uuid += `-${fragment}`;
    }

    return uuid;
}

export const findOrCreateUser = async (userId: string | null, defaultData: UserData['options']): Promise<UserData | undefined> => {
    if (userId) {
        const selectQuery = 'SELECT * FROM user_data WHERE user_id = $1';
        const { rows } = await pool.query<UserDataRow>(selectQuery, [userId]);

        if (rows[0]) {
            return mapRowToUserData(rows[0]);
        }
    }
    const newId = userId || createUUID();

    const insertQuery = `
        INSERT INTO user_data (user_id, options) 
        VALUES ($1, $2) 
        RETURNING *`;

    const { rows: newRows } = await pool.query<UserDataRow>(insertQuery, [newId, defaultData]);
    if (!newRows[0]) {
        return undefined;
    }

    return mapRowToUserData(newRows[0]);
};

const mapRowToUserData = (row: UserDataRow): UserData => ({
    userId: row.user_id,
    options: row.options,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});