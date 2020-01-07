from database import db_connection as con


@con.connection_handler
def get_winners(cursor):
    cursor.execute("""
                   SELECT nick, seconds FROM winners ORDER BY seconds;
                   """)

    winners = cursor.fetchall()
    return winners


@con.connection_handler
def add_winner(cursor, nick, seconds):
    cursor.execute("""
                   INSERT INTO winners(nick, seconds) VALUES(%(nick)s, %(seconds)s)
                   """, {'nick': nick,
                         'seconds': int(seconds)})
