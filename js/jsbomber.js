// Generated by CoffeeScript 1.3.1
var bombs, check_collisions, drop_bomb, explode_bomb, explosion, explosions, extinguish_explosion, game_logic, init_game, player_collision, players, shake_map, timer, update_map;

players = new Array();

bombs = new Array();

explosions = new Array();

timer = null;

init_game = function() {
  players[0] = {
    position: {
      x: 25,
      y: 25
    },
    speed: 5,
    up: false,
    down: false,
    right: false,
    left: false
  };
  return players[1] = {
    position: {
      x: 475,
      y: 475
    },
    speed: 5,
    up: false,
    down: false,
    right: false,
    left: false
  };
};

game_logic = function() {
  var player, _i, _len;
  for (_i = 0, _len = players.length; _i < _len; _i++) {
    player = players[_i];
    if (player.up) {
      player.position.y -= player.speed;
    } else if (player.down) {
      player.position.y += player.speed;
    } else if (player.left) {
      player.position.x -= player.speed;
    } else if (player.right) {
      player.position.x += player.speed;
    }
  }
  update_map();
  if (check_collisions()) {
    return clearTimeout(timer);
  } else {
    return timer = setTimeout("game_logic()", 25);
  }
};

update_map = function() {
  var elem, player, _i, _j, _k, _len, _len1, _len2, _results;
  $('#map').clearCanvas();
  for (_i = 0, _len = bombs.length; _i < _len; _i++) {
    elem = bombs[_i];
    $('#map').drawRect({
      fillStyle: '#0c9df9',
      x: elem.x,
      y: elem.y,
      width: 40,
      height: 40,
      fromCenter: true
    });
  }
  for (_j = 0, _len1 = explosions.length; _j < _len1; _j++) {
    elem = explosions[_j];
    $('#map').drawLine({
      strokeStyle: "#f90c22",
      strokeWidth: 2,
      x1: elem.x,
      y1: 0,
      x2: elem.x,
      y2: 500
    }).drawLine({
      strokeStyle: "#f90c22",
      strokeWidth: 2,
      x1: 0,
      y1: elem.y,
      x2: 500,
      y2: elem.y
    });
  }
  _results = [];
  for (_k = 0, _len2 = players.length; _k < _len2; _k++) {
    player = players[_k];
    _results.push($('#map').drawRect({
      fillStyle: '#3d454b',
      x: player.position.x,
      y: player.position.y,
      width: 25,
      height: 25,
      fromCenter: true,
      strokeStyle: '#000',
      strokeWidth: 1
    }));
  }
  return _results;
};

drop_bomb = function(x_pos, y_pos) {
  var t;
  t = setTimeout("explode_bomb()", 2000);
  return bombs.push({
    x: x_pos,
    y: y_pos,
    timer: t
  });
};

explode_bomb = function() {
  explosion(bombs[0].x, bombs[0].y);
  return bombs.splice(0, 1);
};

explosion = function(x_pos, y_pos) {
  shake_map(5);
  explosions.push({
    x: x_pos,
    y: y_pos
  });
  return setTimeout("extinguish_explosion()", 1000);
};

extinguish_explosion = function() {
  return explosions.splice(0, 1);
};

check_collisions = function() {
  var elem, _i, _len;
  for (_i = 0, _len = explosions.length; _i < _len; _i++) {
    elem = explosions[_i];
    if (player_collision(players[0], elem) && player_collision(players[1], elem)) {
      console.log('both players dead');
      return true;
    } else if (player_collision(players[0], elem)) {
      console.log('player 1 dead');
      return true;
    } else if (player_collision(players[1], elem)) {
      console.log('player 2 dead');
      return true;
    } else {
      return false;
    }
  }
};

player_collision = function(player, explosion) {
  var _ref, _ref1;
  if ((player.position.x - 25 / 2 < (_ref = explosion.x) && _ref < player.position.x + 25 / 2) || (player.position.y - 25 / 2 < (_ref1 = explosion.y) && _ref1 < player.position.y + 25 / 2)) {
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
  init_game();
  return game_logic();
});

$(document).bind('keydown', function(e) {
  if (!event.metaKey) {
    if (e.which === 87) {
      players[0].up = true;
    } else if (e.which === 83) {
      players[0].down = true;
    } else if (e.which === 65) {
      players[0].left = true;
    } else if (e.which === 68) {
      players[0].right = true;
    } else if (e.which === 88) {
      drop_bomb(players[0].position.x, players[0].position.y);
    }
    if (e.which === 80) {
      players[1].up = true;
    } else if (e.which === 186) {
      players[1].down = true;
    } else if (e.which === 76) {
      players[1].left = true;
    } else if (e.which === 222) {
      players[1].right = true;
    } else if (e.which === 191) {
      drop_bomb(players[1].position.x, players[1].position.y);
    }
    return false;
  }
}).bind('keyup', function(e) {
  if (!event.metaKey) {
    if (e.which === 87) {
      players[0].up = false;
    } else if (e.which === 83) {
      players[0].down = false;
    } else if (e.which === 65) {
      players[0].left = false;
    } else if (e.which === 68) {
      players[0].right = false;
    }
    if (e.which === 80) {
      players[1].up = false;
    } else if (e.which === 186) {
      players[1].down = false;
    } else if (e.which === 76) {
      players[1].left = false;
    } else if (e.which === 222) {
      players[1].right = false;
    }
    return false;
  }
});
