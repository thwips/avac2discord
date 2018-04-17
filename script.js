const row = `<br> <div class="row">
<div class="col-12 col-md-6">
<input type="text" class="Name form-control" name="Name" placeholder="Name">
</div>
<div class="col-12 col-md-6 col-lg-2">
<input type="number" min="0" max="100" class="Level form-control" name="Level" placeholder="Level">
</div>
<div class="col-12 col-md-6 col-lg-2">
<select class="Rank custom-select" name="Rank">
<option disabled selected>Rank</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</select>
</div>
<div class="col-12 col-md-6 col-lg-2">
<select class="Rarity custom-select" name="Rarity">
<option disabled selected>Rarity</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</select>
</div>
</div>`

let size = 1

function addRow() {
    var div = document.createElement('div');
    size++
    div.className = `character${size}`
    div.id = `character${size}`
    div.innerHTML = row

    document.getElementById('characters').appendChild(div)
}

function removeRow() {
	if(size > 1){
		let characters = document.getElementById('characters')
		characters.removeChild(characters.lastChild)
	    size--
	}
}


function getCharacters() {
	let characters = []
	for (var i = 0; i < size ; i++) {
		let character = {}
		let characterHTML = document.getElementById(`character${i+1}`)
		character.name = characterHTML.getElementsByClassName('Name form-control')[0].value.trim().slice(0,15)
		character.level = parseInt(characterHTML.getElementsByClassName('Level form-control')[0].value)
		character.rank = characterHTML.getElementsByClassName('Rank custom-select')[0].value
		character.rarity = characterHTML.getElementsByClassName('Rarity custom-select')[0].value
		if(character.name !== null && character.level !== null && Number.isInteger(character.level) && character.rank !== 'Rank' && character.rarity !== 'Rarity'){
			characters.push(character)
		}
		
	}
	displayCharacters(characters)
}

function displayCharacters(characters){
	let nameSize = 0
	let script = '\`\`\`<br>'
	characters.forEach((character)=>{
		if(character.name.length > nameSize) nameSize = character.name.length
	})
	characters.forEach((character)=>{
		let line = `${character.name} `
		for (var i = 0; i < nameSize - character.name.length; i++) {
			line += '&nbsp;'
		}
		line += `| Level: ${character.level}`
		if(character.level < 10) line += '&nbsp;'
		line += ` | Rank: ${character.rank} | Rarity: ${character.rarity}`
		script += `${line}<br>`
	})
	script += '\`\`\`<br>'

	document.getElementById('output').innerHTML = `<div class="jumbotron"><p><code id="copy" class="code">${script}</code></p><button type="button" class="copyButton btn-block btn-success btn" id="copyButtonId" data-id="@item.Type"
 data-clipboard-action="copy" data-clipboard-target="code#copy">Copy</button></div>`
	console.log(script)	
}

var clipboard = new Clipboard('.copyButton');