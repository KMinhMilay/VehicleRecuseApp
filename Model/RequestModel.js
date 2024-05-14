import { getDBConnection } from './database';

export const addRequest =
    async (is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer) => {
        const db = await getDBConnection();
        const query =
            `INSERT INTO Requests 
        (is_bookmarked_by_user, 
        is_bookmarked_by_engineer,
        show_on_user, 
        show_on_engineer) 
        VALUES (?, ?, ?, ?)`;
        await db.executeSql(query,
            [is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer]);
    };