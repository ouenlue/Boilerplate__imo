var tbodyTasks = document.querySelectorAll("#trans2 tbody")[0];

var loadDataTasks = function() {
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'http://botnet.artificial.engineering/api/Tasks');
	
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.send(null);
	
	xhr.onload = function() {
		var response = xhr.response;
		
		updateTableTasks(response);
	}
}

var updateTableTasks = function(data) {
	var tableRows2 = [].slice.call(tbodyTasks.querySelectorAll("#trans2 tbody tr"));
	
	// delete rows
	while (tableRows2.length > data.length) {
		tbodyTasks.removeChild(tableRows2[tableRows2.length - 1]); // html 
		tableRows2.splice(tableRows2.length - 1, 1);			// array
	}

	// update rows
	for (var i = 0; i < tableRows2.length; i++) {
		tableRows2[i].querySelectorAll("#trans2 tbody tr .id")[0].innerHTML = data[i].id;
		tableRows2[i].querySelectorAll("#trans2 tbody tr .type")[0].innerHTML = data[i].type;
		tableRows2[i].querySelectorAll("#trans2 tbody tr .input")[0].innerHTML = data[i].data.input;
		tableRows2[i].querySelectorAll("#trans2 tbody tr .output")[0].innerHTML = data[i].data.output;;
	}
	
	// add rows
	while (tableRows2.length < data.length) {
		var tr = document.createElement("tr");
		
		addTableDataTasks(tr, data[tableRows2.length].id, "id");
		addTableDataTasks(tr, data[tableRows2.length].type, "type");
		addTableDataTasks(tr, data[tableRows2.length].data.input, "input");
		addTableDataTasks(tr, data[tableRows2.length].data.output, "output");
		//addTableButton(tr, data[tableRows2.length].workload);

		tbodyTasks.appendChild(tr); // html
		tableRows2.push(tr);		// array
	}
}

var addTableDataTasks = function(rowElement, val, newElementClass) {
	var td = document.createElement("td");
	td.setAttribute("class", newElementClass);
	rowElement.appendChild(td);
	td.innerHTML = val;
}

loadDataTasks();

// ---------------------------

var sendTask = function() {
	var taskInput = document.querySelectorAll("#trans2 #taskInput")[0];
	var taskSelect = document.querySelectorAll("#trans2 #taskSelect")[0];
	
	var data = {
		type: taskSelect.value,
		data: {
			input: taskInput.value
		}
	};
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'http://botnet.artificial.engineering/api/Tasks');
	
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	//xhr.setRequestHeader('Token', '1234567890');
	
	xhr.send(JSON.stringify(data));
	
	xhr.onload = function() {
		console.log("sendTask: " + JSON.stringify(xhr.response));
	}
}
