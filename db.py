import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="eventbrite",
        user="postgres",
        password="moha",  # Use the password you set earlier
        host="localhost",
        port="5432"
    )
