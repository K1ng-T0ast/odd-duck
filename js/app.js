'use strict';

let survey = [];
let roundsVoting = 25;
let chartObject = null;
let priorProducts = [];

function Image(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

survey.push(new Image('bag', 'img/bag.jpg'));
survey.push(new Image('banana', 'img/banana.jpg'));
survey.push(new Image('bathroom', 'img/bathroom.jpg'));
survey.push(new Image('boots', 'img/boots.jpg'));
survey.push(new Image('breakfast', 'img/breakfast.jpg'));
survey.push(new Image('bubblegum', 'img/bubblegum.jpg'));
survey.push(new Image('chair', 'img/chair.jpg'));
survey.push(new Image('cthulhu', 'img/cthulhu.jpg'));
survey.push(new Image('dog duck', 'img/dog-duck.jpg'));
survey.push(new Image('dragon', 'img/dragon.jpg'));
survey.push(new Image('pen', 'img/pen.jpg'));
survey.push(new Image('pet sweep', 'img/pet-sweep.jpg'));
survey.push(new Image('scissors', 'img/scissors.jpg'));
survey.push(new Image('shark', 'img/shark.jpg'));
survey.push(new Image('sweep', 'img/sweep.png'));
survey.push(new Image('tauntaun', 'img/tauntaun.jpg'));
survey.push(new Image('unicorn', 'img/unicorn.jpg'));
survey.push(new Image('water can', 'img/water-can.jpg'));
survey.push(new Image('wine glass', 'img/wine-glass.jpg'));

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('voting');
let resultsEl = document.getElementById('results');

// console.log('CURRENT RENDERED IMAGES', imgEls);

// console.log('CURRENT SURVEY', survey);

renderProducts();

function generateProducts() {
    return Math.floor(Math.random() * survey.length);
}


function renderProducts() {

    let product1, product2, product3;

    // console.log('PRODUCTS TO RE-RENDER', imgEls, product1, product2, product3);

    do {
        product1 = survey[generateProducts()];
        product2 = survey[generateProducts()];
        product3 = survey[generateProducts()];

    } while (priorProducts.includes(product1) || priorProducts.includes(product2) || priorProducts.includes(product3) || product1 === product2 || product1 === product3 || product2 === product3);


    priorProducts = [product1, product2, product3];

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
    // console.log('THIS IS THE CLICK EVENT', event.target.id);

    let productClicked = event.target.id;
    survey.forEach(product => {
        if (product.name === productClicked) {
            product.timesClicked += 1;
        }
    });
    // console.log('UPDATE SURVEY', survey);

    localStorage.setItem('survey', JSON.stringify(survey));

    if (roundsVoting) {
        renderProducts();
        roundsVoting--;
    } else {
        voteTrackerEl.removeEventListener('click', handleClick);
        alert('Thank you for voting!');
        chartObject = renderChart();

        const storedSurvey = localStorage.getItem('survey');
        if (storedSurvey) {
            survey = JSON.parse(storedSurvey);
            renderProducts();
        }
    }
}

voteTrackerEl.addEventListener('click', handleClick);




// function renderResults() {
// const sortedResults = survey.sort((a, b) => b.timesClicked - a.timesClicked);

//     sortedResults.forEach(product => {
//         let liEl = document.createElement('li');
//         liEl.textContent = `${product.name}: voted for ${product.timesClicked} Times, Shown ${product.timesShown} Times`;
//         resultsEl.appendChild(liEl);
//         console.log(liEl);
//     });
// }

// if (roundsVoting) {
//     renderProducts();
//     roundsVoting--;
//     console.log(roundsVoting);
//     console.log(voteTrackerEl);
// } else {
//     resultsEl.removeEventListener('click', renderResults);
//     renderChart();
// }

// resultsEl.addEventListener('click', renderResults);

const canvasEl = document.getElementById('chart');

function renderChart() {
    let labels = [];
    let votes = [];
    let shown = []
    survey.forEach(product => {
        labels.push(product.name);
        votes.push(product.timesClicked);
        shown.push(product.timesShown);
    });

    return new Chart(canvasEl, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Votes',
                data: votes,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.3)',
                ],
                borderColor: [
                    'rgb(54, 162, 235, 0.8)',

                ],
                borderWidth: 1.5,
                hoverBackgroundColor: [
                    'rgba(255, 159, 64, 0.4)'
                ],
                hoverBorderColor: [
                    'rgb(255, 159, 64, 0.8)'
                ],
            }, {
                label: 'Number of Shown',
                data: shown,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.3)',
                ],
                borderColor: [
                    'rgb(153, 102, 255, 0.8)',
                ],
                borderWidth: 1.5,
                hoverBackgroundColor: [
                    'rgba(255, 205, 86, 0.4)'
                ],
                hoverBorderColor: [
                    'rgb(255, 205, 86, 0.8)'
                ],
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let buttonEl = document.getElementById('submit');
buttonEl.addEventListener('click', function () {
    updateChart([1, 2, 3, 4, 5, 6, 7, 8]);
});



function updateChart(data) {
    console.log('CHART OBJECT TO UPDATE', chartObject.data.datasets[0].data);
    chartObject.data.datasets[0].data = data;
    chartObject.update();
}