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

export const getRequestById = async (id) => {
    const db = await getDBConnection();
    const query = 'SELECT Requests.*, Vehicles.vehicle_name FROM Requests JOIN Vehicles ON Requests.vehicle_id = Vehicles.id WHERE Requests.customer_id = ? OR Requests.engineer_id = ?';
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                query,
                [id],
                (tx, results) => {
                    let rows = results.rows;
                    let data = [];

                    for (let i = 0; i < rows.length; i++) {
                        data.push(rows.item(i));
                    }

                    resolve(data);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
}