
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
let mode = "trial";

// button press key codes 
const spacebar = 32;
const left_key = 37;
const right_key = 39;


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

let choices = {
    left: "bird",
    right: "fish"
};

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
function buttonClicked(choice) {

    console.log("BUTTON CLICKED FUNCTION WAS PRESSED");
    console.log("choice in buttonclicked fx", choice);

    const trialData = {
        rt: new Date() - startTrialTime,
        //resp: $("input[name='question1']:checked").val(),
        resp: choice,
        trialNum: currTrial,
        ans: trialArray[currTrial][1],
        stakes: stakes,
        team: team,
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

   

    console.log("experiment.data", experiment.data);

  
    // call function that takes right/wrong as argument, hides stuff, and gives feedback
    feedback(experiment.trialData.isCorrect);
}

function feedback(isCorrect) {
    // hide/change stuff on screen

    console.log("FEEDBACK FUNCTION WAS CALLED");

    mode = "feedback";

    $(".button").hide();
    $(".teamInfo").hide();

   
    if (isCorrect) {
        feedbackText = "You're right! <br> Press space to continue";
    } else {
        feedbackText = "Nope :( You were wrong. <br> Press space to continue";
    }

  
    document.getElementById("feedbackText").innerHTML = feedbackText;
    $('#feedbackText').show();

    console.log("feedbackText",feedbackText);
}

function nextTrial(){
   
    mode = "trial";

    //TODO: if statement to check if we need another trial 

    console.log("currTrial", currTrial);

    if (currTrial <= numTrials){
        // do some stuff 

        $('#feedbackText').hide();

         // update season and stakes
        season = trialArray[currTrial][0];
        stakes = seasonDict[season].stakes;

         // set season and stakes on screen 
        document.getElementById("season").innerHTML = season;
        document.getElementById("stakes").innerHTML = stakes;

        // reset button to be unselected 
        document.getElementsByClassName('button').checked = false;


        // show choices 
        $(".button").show();
        $(".teamInfo").show();
    

    
    }

    else{
        // do exit stuff

        console.log("seems like the experiment is over");
        endExperiment();
    }


}

function endExperiment (){

    feedbackText = "End of experiment <br> Your responses have been recorded. Your MTURK confirmation code is below:";

    document.getElementById("feedbackText").innerHTML = feedbackText;
    $('#feedbackText').show();

    mode = "end";

}

function instructions (){
    
    mode = "instructions";

    $(".button").hide();
    $(".teamInfo").hide();
    $('#feedbackText').hide();

    feedbackText = "ok in this experiment you're going to do x y and z. to determine what team you will be on";
    document.getElementById("feedbackText").innerHTML = feedbackText;
    $('#feedbackText').show();

    beginExperiment();

}


function beginExperiment(){

    $('#feedbackText').hide();


    mode = "trial";
    document.getElementById("season").innerHTML = trialArray[currTrial][0];
    document.getElementById("team").innerHTML = team;
    document.getElementById("stakes").innerHTML = stakes;
    document.getElementById("points").innerHTML = points;

    $(".button").show();
    $(".teamInfo").show();
   
}


// set variables on the page


//handle user clicks
//$(".button").click(buttonClicked);

//beginExperiment ();
instructions();



$(document).on('keydown',function(e) {
    console.log("a key was pressed");
    console.log(e.which);

    console.log("mode", mode);
    if((e.which == left_key || e.which == right_key) && mode == "trial") {
        
        console.log("IT WAS LEFT OR RIGHT");

        if (e.which == left_key){
            key = "left";

            //choice = choices[key];
            console.log("choice", choices[key]);
        }

        if (e.which == right_key){
            key = "right";

            //choice = choices[key];
            console.log("choice", choices[key]);
        }
        

        
        buttonClicked(choices[key]);


    }
});


$(document).on('keypress',function(e) {
    if(e.which == spacebar && mode != "trial") {
        nextTrial();
    }
});
