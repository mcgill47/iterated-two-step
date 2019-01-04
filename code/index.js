// randomly choose participant's team
const team = Math.random() > 0.5 ? "A" : "B";

// set seed
Math.seedrandom("Easy-as-123");
_ = _.runInContext();

// The main object
const experiment = {
    // * Data and parameters
    feedback_text: "#feedbackText",
	button: "#taskButton", // CHANGE THIS 

	data: [],
	trial_data: {
		trialNum: -1,
        resp: -1,
        ans: -1,
        correct: true,
        rt: -1,
	}

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

// feedback function: takes right vs wrong as argument, hides trial, and presents feedback
// hide using jquery.hide
function giveFeedback (correct){
    
    //no matter what: hide trial using jquery's .hide()

    //in html part, create a div/class that is like about giving responses 
    // then do jquery .show()? 
    
    if (correct){
  // set text equal to you're right 
    }
    else{{
// set text equal to you're wrong 
    }}

    // display the text on the screen 
 
    //if curTrial <= totalTrials or whatever the var was, display an href link to go to next trial 
    // explained at 1:39 of tim brady trial 
}


function showTrial(){
    // set season and team on the page 
    
    // set num points on the stage 

    // collect time stamp of starting trial 
    startTrialTime = new Date ();

}

// function for user interaction
function buttonClicked() {

    // record rt 
    var rt = (new Date()) - startTrialTime;

    // record choice 
    var resp = $("input[name='question1']:checked").val();

    // record trial number 
    var trialNum = currTrial; 

    // get correct answer 
    var trial = trialArray[trialNum];
    var ans = trial[1];

    // check choice against correct answer 
    var correct = (resp === ans);

    // update points 
    points = points + (correct*stakes);

    // set screen to show point update 
    document.getElementById("points").innerHTML = points;

    // save everything into trial_data, 
    // then push trial_data into data 
    // and clear the trial_data for the next trial (or something)
    console.log("trial_data: ");
    console.log(trial_data);

    //record value of button (input) and save it into data

    //check input value against right answer and save right/wrong into data 

    // record time and save it into data 

    // record trial num and save it into data 

    // update trial num 
    currTrial++;
    // call another function that takes right/wrong as argument, hides trial, and gives feedback 
    // on feedback screen 

    // update stuff at bottom of the scream based on team 
    // update team points? 

}


// set variables on the page
document.getElementById("season").innerHTML = trialArray[currTrial][0]; 
document.getElementById("team").innerHTML = team;
document.getElementById("stakes").innerHTML = stakes;
document.getElementById("points").innerHTML = points;

//handle user clicks
$('.button').click(buttonClicked);