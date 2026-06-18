import sqlite3

DATABASE_NAME = "retail_sales.db"


def create_users_table():

    conn = sqlite3.connect(
        DATABASE_NAME
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            email TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL

        )
        """
    )

    conn.commit()
    conn.close()


def register_user(
    name,
    email,
    password
):

    conn = sqlite3.connect(
        DATABASE_NAME
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO users
        (
            name,
            email,
            password
        )

        VALUES
        (
            ?,
            ?,
            ?
        )
        """,
        (
            name,
            email,
            password
        )
    )

    conn.commit()
    conn.close()


def login_user(
    email,
    password
):

    conn = sqlite3.connect(
        DATABASE_NAME
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM users

        WHERE email = ?
        AND password = ?
        """,
        (
            email,
            password
        )
    )

    user = cursor.fetchone()

    conn.close()

    return user


create_users_table()