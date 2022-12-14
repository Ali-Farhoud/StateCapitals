const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

const searchStates = async (searchText) => {
	const res = await fetch('../data/states.json')

	const states = await res.json()

	let matches = states.filter((state) => {
		const regex = new RegExp(`^${searchText}`, 'gi')
		return state.name.match(regex)
	})
	if (searchText.length === 0) {
		matches = []
		matchList.innerHTML = ''
	}
	outputHtml(matches)
}

function outputHtml(matches) {
	if (matches.length > 0) {
		const html = matches
			.map(
				(match) =>
					`<div class='card card-body mb-1'>
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat}, Long: ${match.long} </small>
        </div>`
			)
			.join('')
		matchList.innerHTML = html
	} else {
		matchList.innerHTML = ''
	}
}
search.addEventListener('input', () => searchStates(search.value))
