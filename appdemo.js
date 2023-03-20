'use strict';

const state = [];
let roundsVoting = 5;

function Image(name, source){
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

state.push(new Image('crusin goat', '/assets/crusin-goat.jpg'));
state.push(new Image('float your goat', '/assets/float-your-goat.jpg'));
state.push(new Image('goat logo', '/assets/goat-logo.png'));
state.push(new Image('goat away', '/assets/goat-away.jpg'));
state.push(new Image('goat out of hand', '/assets/goat-out-of-hand.jpg'));
state.push(new Image('kissing goat', '/assets/kissing-goat.jpg'));
state.push(new Image('sassy goat', '/assets/sassy-goat.jpg'));
state.push(new Image('smiling goat', '/assets/smiling-goat.jpg'));
state.push(new Image('sweater goat', '/assets/sweater-goat.jpg'));

let imgELs = document.querySelectorAll('img');

let voteTrackerEl = document.getElementById('vote-tracker');

console.log('CURRENT RENDERED IMAGES', imgELs);

console.log('CURRENT STATE', state);

// imgELs[0].src = state[0].source;
// imgELs[1].src = state[1].source;
// imgELs[0].id = state[0].name;
// imgELs[1].d = state[1].name;

function generateGoats(){
    return Math.floor(Math.random() * state.length);
}

function renderGoats(){

    let goat1 = generateGoats();
    let goat2 = generateGoats();
    console.log('GOATS TO RERENDER', currentRenderedGoats, goat1, goat2);
}

voteTrackerEl.addEventListener('click', function(event){
    console.log(event.target);

    let goatClicked = event.target.id;
    state.forEach(image ==> {
        if (image.name === goatClicked){
            image.timesClicked += 1;
        }
    }
});