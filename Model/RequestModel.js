import { getDBConnection } from '../database';

export const addRequest =
    async (is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer, 
        vehicle_id, customer_id, engineer_id, longitude, latitude, status, notes, create_at
    ) => {
        const db = await getDBConnection();
        const query =
            `INSERT INTO Requests 
        (is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer, 
            vehicle_id, customer_id, engineer_id, longitude, latitude, status, notes, create_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.executeSql(query,
            [is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer,
                vehicle_id, customer_id, engineer_id, longitude, latitude, status, notes, create_at]);
    };