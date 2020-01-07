let cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let turn_counter = 0;
let seconds = 0;
let player_can_click = true;
let nick;

//-------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
  let start_button = document.getElementById('start_button');
  start_button.addEventListener('click', main);
});

//-------------------------------------------------------------------------------------------

function main() {

  nick = document.getElementById('nick').value;
  let nick_is_ok = nick_ok(nick);

  if (nick_is_ok) {
    show_the_board();
    timer_start();
    start_the_game();
  } else
    document.getElementById('error_message').innerText = 'No nick or nick too long';
}

//-------------------------------------------------------------------------------------------

function start_the_game() {
  let cells = document.querySelectorAll('td');

  for (let card_index = 0; card_index < cards.length; card_index++)
    cells[card_index].addEventListener('click', () => player_puts_dot(card_index));
}

//-------------------------------------------------------------------------------------------

function player_puts_dot(card_index) {
  if (player_can_click === true && not_the_same_card(card_index)) {

    let clicked_card = document.getElementById(`card${card_index}`);
    clicked_card.classList.add('player_dot');
    clicked_card.classList.remove('card_to_play');
    remove_card_from_table(card_index);

    player_can_click = false;
    turn_counter++;
    document.getElementById('turn_counter').innerText = `Round: ${turn_counter}`;

    let draw = check_if_draw(turn_counter);
    let player_wins = check_if_win();
    let message_for_the_player = '';

    if (player_wins) {
      message_for_the_player = get_message('won');
      document.querySelector('.container').innerHTML = message_for_the_player;
      let button_to_winners = `<input type="button" value="List of winners" onclick="show_winners()"/>`;
      document.querySelector('.container').insertAdjacentHTML('beforeend', button_to_winners);

    } else if (draw) {
      message_for_the_player = get_message('tied');
      document.querySelector('.container').innerHTML = message_for_the_player;

    } else {
      shuffle_remaining_table(cards);
      let computer_random_index = cards[0]; // the table is shuffled so we choose the first element (it's random)
      computer_puts_dot(computer_random_index);
    }
  }
}

//-------------------------------------------------------------------------------------------

function computer_puts_dot(computer_random_index) {
  setTimeout(() => {
    let computer_card = document.getElementById(`card${computer_random_index}`);
    computer_card.classList.add('computer_dot');
    computer_card.classList.remove('card_to_play');

    remove_card_from_table(computer_random_index);
    player_can_click = true;

    check_if_computer_wins();
  }, 1000)
}

//-------------------------------------------------------------------------------------------

function show_the_board() {

  let board_string = '';
  board_string += `
    <span id="clock">Time: 0</span>
    <table>
      <tr>
          <td id="card0" class="card_to_play"></td>
          <td id="card1" class="card_to_play"></td>
          <td id="card2" class="card_to_play"></td>
      </tr>
      <tr>
          <td id="card3" class="card_to_play"></td>
          <td id="card4" class="card_to_play"></td>
          <td id="card5" class="card_to_play"></td>
      </tr>
      <tr>
          <td id="card6" class="card_to_play"></td>
          <td id="card7" class="card_to_play"></td>
          <td id="card8" class="card_to_play"></td>
      </tr>
    </table>
    <div id="turn_counter">Round: 0</div>
    `;

  document.querySelector('.container').innerHTML = board_string;

  let nick_to_display = document.getElementById('nick_to_display');
  nick_to_display.innerHTML = `<span style="color: red;">${nick}</span> is playing`;
}

//-------------------------------------------------------------------------------------------

function check_if_win() {
  const winners = [
      [0, 1, 2],
      [3, 4, 5],

      [1, 4, 7],

  ];

  if (
      document.getElementById('card0').classList.contains('player_dot') &&
      document.getElementById('card1').classList.contains('player_dot') &&
      document.getElementById('card2').classList.contains('player_dot')
      ||
      document.getElementById('card3').classList.contains('player_dot') &&
      document.getElementById('card4').classList.contains('player_dot') &&
      document.getElementById('card5').classList.contains('player_dot')
      ||
      document.getElementById('card6').classList.contains('player_dot') &&
      document.getElementById('card7').classList.contains('player_dot') &&
      document.getElementById('card8').classList.contains('player_dot')
      ||
      document.getElementById('card0').classList.contains('player_dot') &&
      document.getElementById('card3').classList.contains('player_dot') &&
      document.getElementById('card6').classList.contains('player_dot')
      ||
      document.getElementById('card1').classList.contains('player_dot') &&
      document.getElementById('card4').classList.contains('player_dot') &&
      document.getElementById('card7').classList.contains('player_dot')
      ||
      document.getElementById('card2').classList.contains('player_dot') &&
      document.getElementById('card5').classList.contains('player_dot') &&
      document.getElementById('card8').classList.contains('player_dot')
      ||
      document.getElementById('card0').classList.contains('player_dot') &&
      document.getElementById('card4').classList.contains('player_dot') &&
      document.getElementById('card8').classList.contains('player_dot')
      ||
      document.getElementById('card2').classList.contains('player_dot') &&
      document.getElementById('card4').classList.contains('player_dot') &&
      document.getElementById('card6').classList.contains('player_dot')
  ) return true;
}


//-------------------------------------------------------------------------------------------

function check_if_computer_wins() {
  if (
      document.getElementById('card0').classList.contains('computer_dot') &&
      document.getElementById('card1').classList.contains('computer_dot') &&
      document.getElementById('card2').classList.contains('computer_dot')
      ||
      document.getElementById('card3').classList.contains('computer_dot') &&
      document.getElementById('card4').classList.contains('computer_dot') &&
      document.getElementById('card5').classList.contains('computer_dot')
      ||
      document.getElementById('card6').classList.contains('computer_dot') &&
      document.getElementById('card7').classList.contains('computer_dot') &&
      document.getElementById('card8').classList.contains('computer_dot')
      ||
      document.getElementById('card0').classList.contains('computer_dot') &&
      document.getElementById('card3').classList.contains('computer_dot') &&
      document.getElementById('card6').classList.contains('computer_dot')
      ||
      document.getElementById('card1').classList.contains('computer_dot') &&
      document.getElementById('card4').classList.contains('computer_dot') &&
      document.getElementById('card7').classList.contains('computer_dot')
      ||
      document.getElementById('card2').classList.contains('computer_dot') &&
      document.getElementById('card5').classList.contains('computer_dot') &&
      document.getElementById('card8').classList.contains('computer_dot')
      ||
      document.getElementById('card0').classList.contains('computer_dot') &&
      document.getElementById('card4').classList.contains('computer_dot') &&
      document.getElementById('card8').classList.contains('computer_dot')
      ||
      document.getElementById('card2').classList.contains('computer_dot') &&
      document.getElementById('card4').classList.contains('computer_dot') &&
      document.getElementById('card6').classList.contains('computer_dot')
  ) {
    let message_for_the_player = get_message('lost');
    document.querySelector('.container').innerHTML = message_for_the_player;
  }
}


//-------------------------------------------------------------------------------------------

function shuffle_remaining_table(cards) {
  return cards.sort(function () {
    return 0.5 - Math.random()
  });
}

//-------------------------------------------------------------------------------------------

function remove_card_from_table(index_nr) {
  let index = cards.indexOf(index_nr);
  if (index > -1)
    cards.splice(index, 1);
}

//-------------------------------------------------------------------------------------------

function not_the_same_card(card_index) {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] === card_index)
      return true;
  }
}

//-------------------------------------------------------------------------------------------

function timer_start() {
  game_time = setInterval(() => {
    seconds++;
    document.getElementById('clock').innerText = `Time: ${seconds}`;
  }, 1000);
}

//-------------------------------------------------------------------------------------------

function check_if_draw(turn_counter) {
  if (turn_counter >= 5)
    return true;
}

//-------------------------------------------------------------------------------------------

function get_message(text) {
  let message = `You ${text} in ${seconds} seconds<input type="button" value="Once again?" onclick="refresh()"/>`;
  clearInterval(game_time);
  return message;
}

//-------------------------------------------------------------------------------------------

function refresh() {
  location.reload();
}

//-------------------------------------------------------------------------------------------

function nick_ok(nick) {
  if (nick.length !== 0 && nick.length <= 10)
    return true;
}

//-------------------------------------------------------------------------------------------

function show_winners() {
  location.href = 'add-winner/' + nick + '/' + seconds;
}