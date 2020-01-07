import jinja2
from flask import Flask, render_template, redirect

from database import sql_queries as db

app = Flask(__name__)


@app.route('/')
def index():
    try:
        return render_template('index.html')
    except jinja2.exceptions.TemplateNotFound:
        return 'Page not found. Try again later'


@app.route('/winners')
def show_winners():
    try:
        winners = db.get_winners()
        return render_template('winners.html',
                               winners=winners)
    except FileNotFoundError:
        return 'Page not found. Try again later'


@app.route('/add-winner/<nick>/<seconds>')
def add_winner(nick, seconds):
    try:
        db.add_winner(nick, seconds)
        return redirect('/winners')
    except ConnectionError:
        return 'Error in connecting to database. Try again later'


if __name__ == '__main__':
    app.run(debug=True)
