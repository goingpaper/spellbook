exports.getSpells = () =>
    fetch('https://www.dnd5eapi.co/api/spells')
        .then(response => response.json());

exports.getSpell = (spellIndex) =>
    fetch(`http://www.dnd5eapi.co/api/spells/${spellIndex}`)
        .then(response => response.json());