// randomly choose participant's team
const team = Math.random() > 0.5 ? "A" : "B";

// set seed
Math.seedrandom("Easy-as-123");
_ = _.runInContext();

// Define experiment parameters
const probabilities = [40, 60];
let currTrial = 0;
const numTrials = 20;

const seasonDict = {
    spring: {
        choices: ["bird", "fish"],
        probabilities: [40, 60],
        stakes: 1,
    },
    summer: {
        choices: ["apple", "pear"],
        probabilities: [60, 40],
        stakes: 100,
    },
    fall: {
        choices: ["potato", "pea"],
        probabilities: [40, 60],
        stakes: 10,
    },
    winter: {
        choices: ["yam", "cheese"],
        probabilities: [60, 40],
        stakes: 1,
    },
};

// choose the starting season
// to pick a random season: _.sample(seasons);
let season = seasonDict.spring;
let stakes = season.stakes;

// Define the same trial structure for everyone
// List the season and the correct answer on that trial
const trialArray = [];
for (let seasonName in seasonDict) {
    let thisSeason = seasonDict[seasonName];
    for (let thisTrial of _.range(numTrials)) {
        // pick which choice wins on this trial
        const thisWinner = _.random(0, 100) < thisSeason.probabilities[0] ?
        thisSeason.choices[0] : thisSeason.choices[1];
        trialArray.push([seasonName, thisWinner]);
    }
}

// Do the trials, 4 different ways
// for (let thisTrial of trialArray) {
//     XXX
// }


// give me the index and the trial
// for (let [trialNum, thisTrial] of trialArray.entries()) {

// }

// Access at indices
// let i = 0;
// for (let thisTrial of trialArray) {
    // Do things
//     i++;
// }

// Other way to do that
// for (let i=0; i<80; i++) {
//     let thisTrial = trialArray[i];
// }


// TODO: change later
// function for user interaction
function buttonClicked() {
    alert(value);
}

// set season and team on the page
document.getElementById("season").innerHTML = trialArray[currTrial][0];
document.getElementById("team").innerHTML = team;

//handle user clicks
$('.button').click(buttonClicked);