
document.getElementById("process").addEventListener("click", (e) => {
	let input = document.getElementById("input").value;

	let error   = document.getElementById("error");
	let success = document.getElementById("success");

	if(input == "")
		error.innerHTML = "Não há dados para importar!, adquira contas premium gratis no canal KoField ™";
	else
		document.getElementById("input").disabled = true;

	let lines = input.split('\n');

	let getsucess = 0;

	lines.forEach(function(line) {
  		s = line.split('\t', 7);

  		if(s.length != 7)
  			return;

  		let cHost, cPath, cName, cValue, cSecure, cSession, cExpiry;

  		cHost	= s[0];
  		cPath	= s[2];
  		cName	= s[5];
  		cValue 	= s[6];
  		cSecure = (s[3] == "TRUE");
		cExpiry	= parseInt(s[4]);
		
		cSession = (cExpiry == 0);

		if(!cExpiry)
			cExpiry = 0xffffffff;

		absoluteUrl = cHost.split('.').filter(function(elem){ return elem != ""; }).join('.');

		var browser = browser || chrome

		browser.cookies.set({url:(cSecure ? 'https://' : 'http://') + absoluteUrl, name:cName, value:cValue, domain:cHost, path:cPath, secure:cSecure, expirationDate:cExpiry});

		getsucess++;
	});

	if(getsucess > 0){
		success.innerHTML = "Importação feita com sucesso, Aproveite!";
		error.style.display = "none";
		document.getElementById("input").disabled = false;
		document.getElementById("input").value = "";
	}
});