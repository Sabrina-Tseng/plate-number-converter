const search =  document.getElementById('searchForm');

search.addEventListener('submit', function(e){
   
	e.preventDefault();
	clearAns();

	const platenum = search.elements.platenum;

	// const cellrow = search.elements.cellrow;
	// const cellcolumn = search.elements.cellcolumn;
	// newCell(parseInt(platenum.value), alphabetToNumber(cellrow.value), parseInt(cellcolumn.value))


	const cell = search.elements.cell;
	const cellsplit = cell.value.split("");
	// console.log(cellsplit);

	newCell(parseInt(platenum.value), alphabetToNumber(cellsplit[0]), parseInt(cellsplit[1]+cellsplit[2]+cellsplit[3]))
})


function newCell(platenum, cellrow, cellcolumn) {

	// console.log(" ");
	// console.log("platenum:" + platenum);
	// console.log("cellrow:" + cellrow);
	// console.log("cellcolumn:" + cellcolumn);

	//===== check if in range =====

	if (cellcolumn < 1 || cellcolumn > 24 || cellrow < 1 || cellrow > 16 || platenum < 1){
		showAns("error: input out of range");
		return;
	}

	//===== caculate plate number =====

	let newplatenum = platenum;
	let newcellcolumn = cellcolumn;
	let newcellrow = cellrow;
	let sectioninbigplate = 1;

	if (cellcolumn <= 12 && cellrow <=8) {
		newplatenum = platenum*4 -3;
		sectioninbigplate = 1;
	} 
	else if (cellcolumn >=13 && cellrow <=8){
		newplatenum = platenum*4 -2;
		sectioninbigplate = 2;
	}
	else if (cellcolumn <=12 && cellrow >=9){
		newplatenum = platenum*4 -1;
		sectioninbigplate = 3;
	}
	else if (cellcolumn >=13 && cellrow >=9){
		newplatenum = platenum*4;
		sectioninbigplate = 4;
	}
	else{
		showAns("pleate number error");
		return;
	}

	//===== convert to small plate =====

	//on the right sections, row number -12
	if (sectioninbigplate == 2 || sectioninbigplate == 4){
		newcellcolumn -= 12;
	}
	//on the bottom sections, column number -8
	if (sectioninbigplate == 3 || sectioninbigplate == 4){
		newcellrow -= 8;
	}

	//===== column adjust =====

	if (newcellcolumn <=5) {
		newcellcolumn += 1;
	} 
	else if (newcellcolumn >=8) {
		newcellcolumn -= 1;
	}else{
		showAns("error: this is a controll column");
		return;
	}

	// console.log(platenum + " "+ numberToAlphabet(cellrow)+ cellcolumn + " → " + newplatenum + " " + numberToAlphabet(newcellrow)+ newcellcolumn);
	// showAns(platenum + " "+ numberToAlphabet(cellrow)+ cellcolumn + " → " + newplatenum + " " + numberToAlphabet(newcellrow)+ newcellcolumn);
	showAns(newplatenum +numberToAlphabet(newcellrow)+ newcellcolumn);


}

function clearAns(){
	const answer =  document.getElementById('answer');
	while (answer.firstChild) {
		answer.removeChild(answer.firstChild);
	}
}
function showAns(ans){
	const answer =  document.getElementById('answer');
	answer.insertAdjacentHTML('beforeend', '<div>'+ans+'</div>')
}

function alphabetToNumber(char) {
	const charLower = char.toLowerCase();
	const charCode = charLower.charCodeAt(0);
  
	if (charCode >= 97 && charCode <= 122) {
	  return charCode - 96; // 'a' is 97, so subtract 96 to get 1-based index
	} else {
	  return undefined; // Handle cases where the input is not a letter
	}
  }

function numberToAlphabet(number, isUpperCase = true) {
	const start = isUpperCase ? 65 : 97;
	return String.fromCharCode(start + number - 1);
}