
// randomly choose participant's team
const team = Math.random() > 0.5 ? "A" : "B";

// set seed
Math.seedrandom("Easy-as-123");
_ = _.runInContext();

// The main object
const experiment = {
    // * Data and parameters
    feedbackText: "#feedbackText",
    button: "#taskButton", // CHANGE THIS
    data: [],
    trialData: {},
};


// Define experiment parameters
const probabilities = [40, 60];
let currTrial = 0;
let startTrialTime = new Date();
const numTrials = 20;

const seasonDict = {
    spring: {
        choices: ["bird", "fish"],
        probabilities: [40, 60],
        stakes: 10,
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
let points = 0;

// Define the same trial structure for everyone
// List the season and the correct answer on that trial
const trialArray = [];
for (let seasonName in seasonDict) {
    let thisSeason = seasonDict[seasonName];
    for (let thisTrial of _.range(numTrials)) {
        // pick which choice wins on this trial
        const thisWinner =
            _.random(0, 100) < thisSeason.probabilities[0]
                ? thisSeason.choices[0]
                : thisSeason.choices[1];
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

// feedback function: takes right vs wrong as argument, hides trial, and presents feedback
// hide using jquery.hide

function showTrial() {
    // set season and team on the page

    // set num points on the stage

    // collect time stamp of starting trial
    startTrialTime = new Date();
}

// function for user interaction
function buttonClicked() {
    const trialData = {
        rt: new Date() - startTrialTime,
        resp: $("input[name='question1']:checked").val(),
        trialNum: currTrial,
        ans: trialArray[currTrial][1],
        isCorrect: undefined, // defined later
        points: undefined, // defined later

        // Won't work here because we need the actual value stored
        // Not just a way to get the value
        // get isCorrect() {
        //     return this.resp === this.ans;
        // }

    };

    // check choice against correct answer
    trialData.isCorrect = trialData.resp === trialData.ans;

    // update points
    points = points + trialData.isCorrect * stakes;
    trialData.points = points;

    // put points on screen
    document.getElementById("points").innerHTML = points;

    // then push trialData into data
    // todo: what are these two things doing differently? 
    experiment.trialData = trialData;
    experiment.data.push(trialData);

    // update trial num
    currTrial++;

    // todo: update season and stakes
    season = trialArray[currTrial][0];
    stakes = seasonDict[season].stakes;

    console.log("trialArray", trialArray);
    console.log("experiment.data", trialArray[currTrial]);

  
    // call function that takes right/wrong as argument, hides stuff, and gives feedback
    feedback(experiment.trialData.isCorrect);
}

function feedback(isCorrect) {
    // hide/change stuff on screen
    $(".button").hide();
    $(".teamInfo").hide();

    // document.getElementById("season").innerHTML = trialArray[currTrial][0];
    document.getElementById("season").innerHTML = season;
    document.getElementById("stakes").innerHTML = stakes;

    if (isCorrect) {
        feedbackText = "You're right!";
    } else {
        feedbackText = "Nope :(";
    }

    console.log(feedbackText);
}

// set variables on the page
document.getElementById("season").innerHTML = trialArray[currTrial][0];
document.getElementById("team").innerHTML = team;
document.getElementById("stakes").innerHTML = stakes;
document.getElementById("points").innerHTML = points;

//handle user clicks
$(".button").click(buttonClicked);
