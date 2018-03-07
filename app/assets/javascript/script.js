var characters = ["test", "yoda", "luke", "han", "lando", "rey", "poe", "finn", "windu", "amidala", "qui-gon", "chewbacca",
"r2-d2", "ackbar", "leia", "anakin", "palpatine", "greedo", "jabba", "maul", "vader","binks",
"wicket","grievous", "dooku","boba","jango"];
var user_picks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false,
false, false, false, false, false, false, false, false, false, false, false, false, false];
var current_char = 0;
var person = (characters[current_char]);

var config = {
apiKey: "AIzaSyDqMMiRCJqUOw2BGZe3UETcuBPDFyHIn04",
authDomain: "hoth-or-not-d14ab.firebaseapp.com",
databaseURL: "https://hoth-or-not-d14ab.firebaseio.com",
projectId: "hoth-or-not-d14ab",
storageBucket: "hoth-or-not-d14ab.appspot.com",
messagingSenderId: "273129403707"
};
firebase.initializeApp(config);

var database = firebase.database();

var hotCount = 0;
var notCount = 0;
var totalVotes = 0;

function fire() {
event.preventDefault();
var gamma = $(this).attr("data-Hvalue");

database.ref().on("value", function(snapshot) {

hotCount = snapshot.val()[gamma].hot;
notCount = snapshot.val()[gamma].not;
totalVotes = snapshot.val()[gamma].total;
//console.log(hotCount);
//console.log(notCount);

}, function(errorObject) {
console.log("The read failed: " + errorObject.code);
});

console.log("MUSTIFAR");


//console.log(gamma)
hotCount++;
totalVotes++;

database.ref().child(gamma).set({
hot: hotCount,
not: notCount,
total: totalVotes
});

user_picks[current_char] = true;
current_char++;
person = (characters[current_char]);
checker();
}; 

function ice() {
event.preventDefault();
var gamma = $(this).attr("data-Cvalue");
database.ref().on("value", function(snapshot) {

hotCount = snapshot.val()[gamma].hot;
notCount = snapshot.val()[gamma].not;
totalVotes = snapshot.val()[gamma].total;
//console.log(notCount);
//console.log(notCount);
}, function(errorObject) {
console.log("The read failed: " + errorObject.code);
});

console.log("HOTH");

//console.log(gamma + " pickles");
//console.log(beta);
notCount++;
totalVotes++;
database.ref().child(gamma).set({
hot: hotCount,
not: notCount,
total: totalVotes
});

user_picks[current_char] = false;
current_char++;
person = (characters[current_char]);

checker();
};



function generate() {
$("#mustifar-btn").empty();
var nextHotBtn = $("<button>");
nextHotBtn.attr("data-Hvalue", person);
nextHotBtn.text("Hot!");
nextHotBtn.addClass("mustifar-btn")
$("#mustifar-btn").html(nextHotBtn); 
//  console.log("---------------");
//  console.log(person); 

// get image function being called
getImage(person);


$("#hoth-btn").empty();
var nextColdBtn = $("<button>");
nextColdBtn.attr("data-Cvalue", person);
nextColdBtn.text("Not!");
nextColdBtn.addClass("hoth-btn");
//console.log(nextColdBtn);
$("#hoth-btn").html(nextColdBtn);                   
}

function checker() {
if (current_char == 27) {
console.log(user_picks);
}
else if (current_char < 27) {
generate()
}
}
$(document).on("click", ".hoth-btn", ice);
$(document).on("click", ".mustifar-btn", fire);
generate();

function getImage (charname) {
// console.log(charname);
$.get('/api/characters', function (data){
for (var i =0;i<data.length;i++){
if (data[i].name.indexOf(charname)>-1){
console.log(data[i]);
$('#imgDiv').empty();
var newImg = $('<img>');
newImg.attr('src',data[i].url);
$('#imgDiv').append(newImg);
}
}
})
}