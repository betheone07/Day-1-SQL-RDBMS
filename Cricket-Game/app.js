//First Player Hits
var bt1 = document.getElementById('hit1');
//Second Player Hits
var bt2 = document.getElementById('hit2');
var time; //for timer
var action; //clearing 
//initially
var myinput = {
    balls: 1,
    players: 1,
    time: 60,
    total: 0
};
var Game = /** @class */ (function () {
    function Game(input) {
        this.ball = input.balls;
        this.player = input.players;
        this.time = input.time;
        this.total = input.total;
    }
    // Timer On with 1sec intervals
    Game.prototype.timer = function () {
        time = 60;
        action = setInterval(function () {
            time = time--;
            console.log(this.total);
            document.getElementById("timer").innerHTML = time;
            if (time == 0) {
                //after time over disable game
                bt1.toggleAttribute('disabled');
                bt2.toggleAttribute('disabled');
                clearInterval(action);
            }
        }, 1000);
    };
    Game.prototype.mybowler = function (player, score) {
        //reset after timer over
        if (time == 0) {
            this.player = 1;
            this.ball = 1;
            this.total = 0;
            this.timer();
        }
        var td = document.getElementById(player + this.player).getElementsByTagName('td');
        var run = Math.floor(Math.random() * 7).toString();
        td[this.ball].innerHTML = run;
        var scorer1 = document.getElementById(score);
        scorer1.innerHTML = (+scorer1.innerHTML + +run).toString();
        var score2 = document.getElementById('score2').innerHTML;
        this.total = this.total + +run;
        if (run == '0') {
            this.ball = 1;
            this.player = this.player + 1;
            td[7].innerHTML = this.total.toString();
            this.total = 0;
        }
        else {
            this.ball = this.ball + 1;
        }
        //edge cases
        if ((this.player == 10 && this.ball == 7) || (this.player == 11 && run == '0') || time < 1) {
            if (+score2 >> 0) {
                if (td[7].innerHTML.length == 0) {
                    td[7].innerHTML = this.total.toString();
                }
                clearInterval(action);
                time = 0;
                document.getElementById("timer").innerHTML = time.toString();
                bt1.disabled = true;
                bt2.disabled = true;
                this.result();
                document.getElementById('results').style.display = 'block';
            }
            else {
                if (td[7].innerHTML.length == 0) {
                    td[7].innerHTML = this.total.toString();
                }
                this.player = 1;
                this.ball = 1;
                clearInterval(action);
                this.timer();
                document.getElementById("timer").innerHTML = '0';
                bt1.toggleAttribute('disabled');
                bt2.toggleAttribute('disabled');
                this.total = 0;
                td[0].style.background = 'none';
                td[0].style.color = 'white';
            }
        }
        else if (this.ball == 7) {
            this.player = this.player + 1;
            this.ball = 1;
            td[7].innerHTML = this.total.toString();
            this.total = 0;
        }
        var tdprev = document.getElementById(player + (this.player - 1)).getElementsByTagName('td');
    };
    Game.prototype.result = function () {
        var man1 = {
            "Team": '',
            "player": '',
            'score': 0
        };
        for (var i = 0; i < 10; i++) {
            var td = document.getElementById('player' + i).getElementsByTagName('td');
            var score = td[7].innerHTML;
            if (man1.score < (+score)) {
                man1.score = (+score);
                man1.player = 'player' + i;
                man1.Team = '1';
            }
        }
        for (var i = 1; i < 11; i++) {
            var td = document.getElementById('p' + i).getElementsByTagName('td');
            var score = td[7].innerHTML;
            if (man1.score < (+score)) {
                man1.score = (+score);
                man1.player = 'player' + i;
                man1.Team = '2';
            }
        }
        var score1 = document.getElementById('score1').innerHTML;
        var score2 = document.getElementById('score2').innerHTML;
        var win = {
            'team': '',
            'score': ''
        };
        if ((+score1) > (+score2)) {
            win.team = 'Team 1';
            win.score = score1;
            alert("Wining Team : " + win.team + " With Score : " + win.score);
        }
        else {
            win.team = 'Team 2';
            win.score = score2;
            alert("Wining Team : " + win.team + " With Score : " + win.score);
        }
    };
    return Game;
}());
var game = new Game(myinput);
document.getElementById('hit1').setAttribute('onclick', 'game.mybowler("player","score1")');
document.getElementById('hit2').setAttribute('onclick', 'game.mybowler("p","score2")');
document.getElementById('start').setAttribute('onclick', 'gameBegin()');
function gameBegin() {
    bt1.toggleAttribute('disabled');
    game.timer();
    document.getElementById('start').disabled = true;
}
