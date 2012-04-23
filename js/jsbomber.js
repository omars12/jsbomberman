// Generated by CoffeeScript 1.3.1
var bomb_collision, bombs, check_collisions, drop_bomb, explode_bomb, explosion, explosions, extinguish_explosion, game_logic, game_over_screen, game_started, init_game, intro_screen, on_snap_x, on_snap_y, player_collision, players, shake_map, timer, update_map;

players = new Array();

bombs = new Array();

explosions = new Array();

timer = null;

game_started = false;

intro_screen = function() {
  return $('#map').drawText({
    fillStyle: '#000',
    x: 250,
    y: 100,
    text: 'JSBomber',
    font: '60pt Helvetica, sans-serif'
  }).drawText({
    fillStyle: '#000',
    x: 250,
    y: 300,
    text: "Press 'spacebar' to start",
    font: '25pt Helvetica, sans-serif'
  });
};

game_over_screen = function(text) {
  return $('#map').drawText({
    fillStyle: '#000',
    x: 250,
    y: 100,
    text: text,
    font: '50pt Helvetica, sans-serif'
  }).drawText({
    fillStyle: '#000',
    x: 250,
    y: 300,
    text: "Play again? (Spacebar)",
    font: '25pt Helvetica, sans-serif'
  });
};

init_game = function() {
  game_started = true;
  bombs = [];
  explosions = [];
  players[0] = {
    position: {
      x: 25,
      y: 25
    },
    facing: 'down',
    speed: 5,
    num_bombs: 3,
    bomb_range: 3,
    controls: {
      up: 87,
      down: 83,
      left: 65,
      right: 68,
      drop: 88
    },
    up: false,
    down: false,
    right: false,
    left: false,
    dead: false
  };
  return players[1] = {
    facing: 'up',
    position: {
      x: 475,
      y: 475
    },
    speed: 5,
    num_bombs: 3,
    bomb_range: 3,
    controls: {
      up: 80,
      down: 186,
      left: 76,
      right: 222,
      drop: 191
    },
    up: false,
    down: false,
    right: false,
    left: false,
    dead: false
  };
};

on_snap_x = function(player) {
  var x, x_distance;
  x = player.position.x;
  x_distance = (x - 25) % 50;
  if (x_distance > 0) {
    if (x_distance < 25) {
      return x - x_distance;
    } else {
      return x + (50 - x_distance);
    }
  } else {
    return x;
  }
};

on_snap_y = function(player) {
  var y, y_distance;
  y = player.position.y;
  y_distance = (y - 25) % 50;
  if (y_distance > 0) {
    if (y_distance < 25) {
      return y - y_distance;
    } else {
      return y + (50 - y_distance);
    }
  } else {
    return y;
  }
};

game_logic = function() {
  var player, _i, _len;
  for (_i = 0, _len = players.length; _i < _len; _i++) {
    player = players[_i];
    if (player.up) {
      if (on_snap_x(player) !== player.position.x) {
        if (on_snap_x(player) > player.position.x) {
          player.position.x += player.speed;
        } else {
          player.position.x -= player.speed;
        }
      } else {
        player.position.y -= player.speed;
      }
    } else if (player.down) {
      if (on_snap_x(player) !== player.position.x) {
        if (on_snap_x(player) > player.position.x) {
          player.position.x += player.speed;
        } else {
          player.position.x -= player.speed;
        }
      } else {
        player.position.y += player.speed;
      }
    } else if (player.left) {
      if (on_snap_y(player) !== player.position.y) {
        if (on_snap_y(player) > player.position.y) {
          player.position.y += player.speed;
        } else {
          player.position.y -= player.speed;
        }
      } else {
        player.position.x -= player.speed;
      }
    } else if (player.right) {
      if (on_snap_y(player) !== player.position.y) {
        if (on_snap_y(player) > player.position.y) {
          player.position.y += player.speed;
        } else {
          player.position.y -= player.speed;
        }
      } else {
        player.position.x += player.speed;
      }
    }
    if (player.position.y < 25) {
      player.position.y = 25;
    } else if (player.position.y > 475) {
      player.position.y = 475;
    }
    if (player.position.x < 25) {
      player.position.x = 25;
    } else if (player.position.x > 475) {
      player.position.x = 475;
    }
  }
  update_map();
  if (check_collisions()) {
    clearTimeout(timer);
    return game_started = false;
  } else {
    return timer = setTimeout("game_logic()", 25);
  }
};

update_map = function() {
  var arc_end, arc_start, elem, num, overlay, player, template, _i, _j, _k, _l, _len, _len1, _len2, _len3, _results;
  $('#map').clearCanvas();
  template = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  overlay = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = template.length; _i < _len; _i++) {
      num = template[_i];
      _results.push(num * 50);
    }
    return _results;
  })();
  for (_i = 0, _len = overlay.length; _i < _len; _i++) {
    num = overlay[_i];
    $('#map').drawLine({
      strokeStyle: "#cfcfcf",
      strokeWidth: 1,
      x1: num,
      y1: 0,
      x2: num,
      y2: 500
    }).drawLine({
      strokeStyle: "#cfcfcf",
      strokeWidth: 1,
      x1: 0,
      y1: num,
      x2: 500,
      y2: num
    });
  }
  for (_j = 0, _len1 = bombs.length; _j < _len1; _j++) {
    elem = bombs[_j];
    $('#map').drawRect({
      fillStyle: '#0c9df9',
      x: elem.x,
      y: elem.y,
      width: 40,
      height: 40,
      fromCenter: true
    });
  }
  for (_k = 0, _len2 = explosions.length; _k < _len2; _k++) {
    elem = explosions[_k];
    $('#map').drawLine({
      strokeStyle: "#f90c22",
      strokeWidth: 2,
      x1: elem.x,
      y1: elem.y - elem.r * 50 + 25,
      x2: elem.x,
      y2: elem.y + elem.r * 50 + 25
    }).drawLine({
      strokeStyle: "#f90c22",
      strokeWidth: 2,
      x1: elem.x - elem.r * 50 + 25,
      y1: elem.y,
      x2: elem.x + elem.r * 50 + 25,
      y2: elem.y
    });
  }
  _results = [];
  for (_l = 0, _len3 = players.length; _l < _len3; _l++) {
    player = players[_l];
    $('#map').drawRect({
      fillStyle: '#fff',
      x: player.position.x,
      y: player.position.y,
      width: 25,
      height: 25,
      fromCenter: true,
      strokeStyle: '#000',
      strokeWidth: 1
    });
    if (player.facing === 'right') {
      arc_start = 45;
      arc_end = 135;
    } else if (player.facing === 'down') {
      arc_start = 135;
      arc_end = 225;
    } else if (player.facing === 'left') {
      arc_start = 225;
      arc_end = 315;
    } else if (player.facing === 'up') {
      arc_start = 315;
      arc_end = 45;
    }
    _results.push($('#map').drawArc({
      strokeStyle: "#000",
      strokeWidth: 1,
      x: player.position.x,
      y: player.position.y,
      radius: 18,
      start: arc_start,
      end: arc_end
    }));
  }
  return _results;
};

drop_bomb = function(x_pos, y_pos, pid, brange) {
  return bombs.push({
    x: x_pos,
    y: y_pos,
    player_id: pid,
    range: brange,
    timer: setTimeout("explode_bomb()", 3000)
  });
};

explode_bomb = function(index) {
  var pid;
  if (index == null) {
    index = 0;
  }
  clearTimeout(bombs[index].timer);
  pid = bombs[index].player_id;
  players[pid].num_bombs += 1;
  explosion(bombs[index].x, bombs[index].y, bombs[index].range);
  return bombs.splice(index, 1);
};

explosion = function(x_pos, y_pos, range) {
  shake_map(range);
  explosions.push({
    x: x_pos,
    y: y_pos,
    r: range
  });
  return setTimeout("extinguish_explosion()", 1000);
};

extinguish_explosion = function() {
  return explosions.splice(0, 1);
};

check_collisions = function() {
  var explosion, player, _i, _j, _len, _len1;
  for (_i = 0, _len = explosions.length; _i < _len; _i++) {
    explosion = explosions[_i];
    for (_j = 0, _len1 = players.length; _j < _len1; _j++) {
      player = players[_j];
      if (player_collision(player, explosion)) {
        player.dead = true;
      }
    }
  }
  if (players[0].dead && players[1].dead) {
    game_over_screen('double suicide');
    return true;
  } else if (players[0].dead) {
    game_over_screen('player 1 dead');
    return true;
  } else if (players[1].dead) {
    game_over_screen('player 2 dead');
    return true;
  } else {
    return false;
  }
};

player_collision = function(player, explosion) {
  var _ref, _ref1;
  if (((player.position.x - 25 / 2 < (_ref = explosion.x) && _ref < player.position.x + 25 / 2) && Math.abs(player.position.y - explosion.y) < explosion.r * 50 + 25) || ((player.position.y - 25 / 2 < (_ref1 = explosion.y) && _ref1 < player.position.y + 25 / 2) && Math.abs(player.position.x - explosion.x) < explosion.r * 50 + 25)) {
    return true;
  } else {
    return false;
  }
};

bomb_collision = function(bomb, explosion) {
  var _ref, _ref1;
  if ((bomb.x - 40 / 2 < (_ref = explosion.x) && _ref < bomb.x + 40 / 2) || (bomb.y - 40 / 2 < (_ref1 = explosion.y) && _ref1 < bomb.y + 40 / 2)) {
    return true;
  } else {
    return false;
  }
};

shake_map = function(offset) {
  return $('#map').animate({
    left: '+=' + offset
  }, 100, function() {
    return $('#map').animate({
      left: '-=' + offset
    }, 100, function() {});
  });
};

$(function() {
  return intro_screen();
});

$(document).bind('keydown', function(e) {
  var player, player_id, _i, _len;
  if (!event.metaKey) {
    if (!game_started) {
      if (e.which === 32) {
        init_game();
        game_logic();
      }
    }
    for (player_id = _i = 0, _len = players.length; _i < _len; player_id = ++_i) {
      player = players[player_id];
      if (e.which === player.controls.up) {
        player.up = true;
        player.facing = 'up';
      } else if (e.which === player.controls.down) {
        player.down = true;
        player.facing = 'down';
      } else if (e.which === player.controls.left) {
        player.left = true;
        player.facing = 'left';
      } else if (e.which === player.controls.right) {
        player.right = true;
        player.facing = 'right';
      } else if (e.which === player.controls.drop) {
        if (player.num_bombs > 0) {
          drop_bomb(on_snap_x(player), on_snap_y(player), player_id, player.bomb_range);
          player.num_bombs -= 1;
        }
      }
    }
    return false;
  }
}).bind('keyup', function(e) {
  var player, player_id, _i, _len;
  if (!event.metaKey) {
    for (player_id = _i = 0, _len = players.length; _i < _len; player_id = ++_i) {
      player = players[player_id];
      if (e.which === player.controls.up) {
        player.up = false;
      } else if (e.which === player.controls.down) {
        player.down = false;
      } else if (e.which === player.controls.left) {
        player.left = false;
      } else if (e.which === player.controls.right) {
        player.right = false;
      }
    }
    return false;
  }
});
