// const upload =  document.getElementById('upload');

// upload.addEventListener('change', function(e){

// 	e.preventDefault();

// 	console.log('file uploaded')
	
// })

// XLSX is a global from the standalone script

async function handleFileAsync(e) {
	const file = e.target.files[0];
	const data = await file.arrayBuffer();
	/* data is an ArrayBuffer */
	const workbook = XLSX.read(data);

	/* DO SOMETHING WITH workbook HERE */

	// console.log(workbook);
	convertSheetToJson(file);
}

function convertSheetToJson(file) {
	const reader = new FileReader();
	reader.onload = (e) => {
	  const data = new Uint8Array(e.target.result);
	  const workbook = XLSX.read(data, { type: 'array' });
	  const sheetName = workbook.SheetNames[0];
	  const worksheet = workbook.Sheets[sheetName];
	  const json = XLSX.utils.sheet_to_json(worksheet);
	//   console.log(json);
		processjson(json);
	};
	reader.readAsArrayBuffer(file);
}

function processjson(json){
	json.forEach(element => {
		// console.log(element);

		const cell = element.Well;
		const cellsplit = cell.split("");

		// console.log(cellsplit);

		newCell(parseInt(element.Plate), alphabetToNumber(cellsplit[0]), parseInt(cellsplit[1]+cellsplit[2]+cellsplit[3]));
	});
}

input_dom_element.addEventListener("change", handleFileAsync, false);