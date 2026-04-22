import pool from '#config/databasePool';

export const updateUserOptions = async (userId: string, partialOptions: Record<string, any>) => {
    const query = `
        UPDATE user_data 
        SET options = options || $2::jsonb
        WHERE user_id = $1
        RETURNING user_id, options, updated_at;
    `;

    const values = [userId, JSON.stringify(partialOptions)];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
};