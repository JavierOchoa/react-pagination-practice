import './character-card.css'

function CharacterCard (data){
    let character = data.data
    return (
        <div className={'charCard'}>
            <img className={'profilePic'} src={character.image} alt={character.name}/>
            <p className={'charName'}>{character.name}</p>
            <p className={'charSpecies'}>{character.species}</p>
        </div>
    )
}

export default CharacterCard;