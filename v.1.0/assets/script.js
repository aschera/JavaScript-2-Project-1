var userinput = [{
		island:null,
		wonders:null,
		attractions:null,
		safe:null,
		dangerous_animals:null,
		dangerous_diseases:null,
		size:null,
		temp:null,
		population_density:null,
		natural_disasters:null}];
var references = [{
		name:'Australia',
		island:false,
		wonders:true,
		attractions:false,
		safe:false,
		dangerous_animals:true,
		dangerous_diseases:false,
		size:'Large',
		temp:'Hot',
		population_density:'Scarce',
		natural_disasters:false}];

let getID = id => document.getElementById(id);

let current = 1;
let obj = userinput[0];

var q1  = getID('question1'),
	q2  = getID('question2'),
	q3  = getID('question3'),
	q4  = getID('question4'),
	q5  = getID('question5'),
	q6  = getID('question6'),
	q7  = getID('question7'),
	q8  = getID('question8'),
	q9  = getID('question9'),
	q10 = getID('question10');
var currentInfo = getID('currentInfo');

let nextQuestion = (objectProperty, statement) => {
	switch(current) {
		case 1:  obj.             island = statement; hideDiv((q1));  currentInfo.innerHTML = 'Do you admire world wonders?'; break;
		case 2:  obj.            wonders = statement; hideDiv((q2));  currentInfo.innerHTML = 'Do you like attractions?'; break;
		case 3:  obj.        attractions = statement; hideDiv((q3));  currentInfo.innerHTML = 'Do you like to live on the edge?'; break;
		case 4:  obj.               safe = statement; hideDiv((q4));  currentInfo.innerHTML = 'Dangerous or harmless animals?'; break;
		case 5:  obj.  dangerous_animals = statement; hideDiv((q5));  currentInfo.innerHTML = 'Danger of diseases or harmless environment?'; break;
		case 6:  obj. dangerous_diseases = statement; hideDiv((q6));  currentInfo.innerHTML = 'Do you like to move from place to place?'; break;
		case 7:  obj.               size = statement; hideDiv((q7));  currentInfo.innerHTML = 'Hot or Cold?'; break;
		case 8:  obj.               temp = statement; hideDiv((q8));  currentInfo.innerHTML = 'Lots of people around you?'; break;
		case 9:  obj. population_density = statement; hideDiv((q9));  currentInfo.innerHTML = 'Calm vibes or natural disasters?'; break;
		case 10: obj.  natural_disasters = statement; hideDiv((q10)); break;}
	current++;
	if(current > 10) {
		let result = compareObjectArrays(userinput,references);
		sendAPIrequest(result);}}

let sendAPIrequest = (name) => {
	let infoHeader = getID('currentInfoHeader');
	infoHeader.innerHTML = 'Congratulations! The quiz chose..';
	currentInfo.innerHTML = name;}

let hideDiv = obj => {
	obj.classList.remove('is-paused');
	setTimeout(function(){ 
		obj.style.display = 'none';
		obj.style.visibility = 'hidden';
	},200);}

let compareObjectArrays = (a,b) => {
	let result,
		val = 0;
	for(let x in a) {
		for (let y in b) {
			let sim = similarities(a[x], b[y]);
			if(sim > val) {
				val = sim;
				result = b[y].name;}}}
	return result;}

let  similarities = (input,reference) => {
	let similarities = 0;
	for (let object in reference) {
		if(input[object] == reference[object]) {
			similarities++;}}
	return similarities;}

let shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;}}

shuffle(references);
