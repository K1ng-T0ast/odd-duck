'use strict';

const survey = [];
let roundsVoting = 26;

function Image(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

survey.push(new Image('bag', '/img/bag.jpg'));
survey.push(new Image('banana', '/img/banana.jpg'));
survey.push(new Image('bathroom', '/img/bathroom.jpg'));
survey.push(new Image('boots', '/img/boots.jpg'));
survey.push(new Image('breakfast', '/img/breakfast.jpg'));
survey.push(new Image('bubblegum', '/img/bubblegum.jpg'));
survey.push(new Image('chair', '/img/chair.jpg'));
survey.push(new Image('cthulhu', '/img/cthulhu.jpg'));
survey.push(new Image('dog duck', '/img/dog-duck.jpg'));
survey.push(new Image('dragon', '/img/dragon.jpg'));
survey.push(new Image('pen', '/img/pen.jpg'));
survey.push(new Image('pet sweep', '/img/pet-sweep.jpg'));
survey.push(new Image('scissors', '/img/scissors.jpg'));
survey.push(new Image('shark', '/img/shark.jpg'));
survey.push(new Image('sweep', '/img/sweep.png'));
survey.push(new Image('tauntaun', '/img/tauntaun.jpg'));
survey.push(new Image('unicorn', '/img/unicorn.jpg'));
survey.push(new Image('water can', '/img/water-can.jpg'));
survey.push(new Image('wine glass', '/img/wine-glass.jpg'));

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('voting');
let resultsEl = document.getElementById('results');

console.log('CURRENT RENDERED IMAGES', imgEls);

console.log('CURRENT SURVEY', survey);

renderProducts();

function generateProducts() {
    return Math.floor(Math.random() * survey.length);
}

function renderProducts() {

    let product1 = survey[generateProducts()];
    let product2 = survey[generateProducts()];
    let product3 = survey[generateProducts()];
    console.log('PRODUCTS TO RE-RENDER', imgEls, product1, product2, product3);

    while (product1.name === product2.name || product1.name === product3.name || product2.name === product3.name) {
        survey[generateProducts()] = survey[generateProducts()];
        product1 = survey[generateProducts()];
        product2 = survey[generateProducts()];
        product3 = survey[generateProducts()];
    }

    imgEls[0].src = product1.source;
    imgEls[0].id = product1.name;
    product1.timesShown += 1;
    imgEls[1].src = product2.source;
    imgEls[1].id = product2.name;
    product2.timesShown += 1;
    imgEls[2].src = product3.source;
    imgEls[2].id = product3.name;
    product3.timesShown += 1;
}




function handleClick(event) {
    console.log(event.target.id);

    let productClicked = event.target.id;
    // survey[0].timesClicked++;
    survey.forEach(product => {
        if (product.name === productClicked) {
            product.timesClicked += 1;
        }
    });
    if (roundsVoting) {
        renderProducts();
        roundsVoting--;
        console.log(roundsVoting);
        console.log(voteTrackerEl);
        console.log(imgEls);
        console.log(survey);
    } else {
        voteTrackerEl.removeEventListener('click', handleClick);
    }
}

voteTrackerEl.addEventListener('click', handleClick);




function renderResults() {
    const sortedResults = survey.sort((a, b) => b.timesShown - a.timesClicked);

    sortedResults.forEach(product => {
        let liEl = document.createElement('li');
        liEl.textContent = `${product.name}: clicked ${product.timesClicked} times, shown ${product.timesShown} times`;
        resultsEl.appendChild(liEl);
        console.log(liEl);
    });
}

if (roundsVoting) {
    renderProducts();
    roundsVoting--;
    console.log(roundsVoting);
    console.log(voteTrackerEl);
} else {
    resultsEl.removeEventListener('click', renderResults);
}

resultsEl.addEventListener('click', renderResults);

