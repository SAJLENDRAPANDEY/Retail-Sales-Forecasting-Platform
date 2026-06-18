import sqlite3

DATABASE_NAME = "retail_sales.db"


def create_history_table():
    conn = sqlite3.connect(
        DATABASE_NAME
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS upload_history (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            filename TEXT NOT NULL,

            rows INTEGER NOT NULL,

            columns INTEGER NOT NULL,

            upload_time TIMESTAMP
            DEFAULT CURRENT_TIMESTAMP

        )
        """
    )

    conn.commit()
    conn.close()


def save_upload_history(
    filename,
    rows,
    columns
):
    conn = sqlite3.connect(
        DATABASE_NAME
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO upload_history
        (
            filename,
            rows,
            columns
        )

        VALUES
        (
            ?,
            ?,
            ?
        )
        """,
        (
            filename,
            rows,
            columns
        )
    )

    conn.commit()
    conn.close()


def get_upload_history():
    conn = sqlite3.connect(
        DATABASE_NAME
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            id,
            filename,
            rows,
            columns,
            upload_time
        FROM upload_history
        ORDER BY id DESC
        """
    )

    data = cursor.fetchall()

    conn.close()

    return data


def delete_history(
    history_id
):
    conn = sqlite3.connect(
        DATABASE_NAME
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM upload_history
        WHERE id = ?
        """,
        (history_id,)
    )

    conn.commit()
    conn.close()


# Create table automatically
create_history_table()


# Testing
if __name__ == "__main__":

    save_upload_history(
        filename="sales_data.xlsx",
        rows=500,
        columns=12
    )

    history = get_upload_history()

    print(
        "Upload History:"
    )

    for row in history:
        print(row)