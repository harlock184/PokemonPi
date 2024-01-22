const initialState = {
    pokemones: [],
    allPokemones: [],
    types: [],
    allTypes: [],
    detail: null,
    pokemons: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemones: action.payload,
                allPokemones: action.payload,
            };
        case 'ADD_POKEMON':
           return {
            ...state,
            pokemons: [...state.pokemons, action.payload],
            allPokemones: [...state.allPokemones, action.payload]
           }  
       

        case 'GET_POKE_BY_NAME':
            return{
                ...state,
                pokemones: action.payload
            }
        
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload,
            };
             
      
        case "GET_TYPES":
             return {
                  ...state,
                 types: action.payload,
                 allTypes: action.payload
             };
                 
        case 'FILTER_BY_TYPES':
             const allPokemones = state.allPokemones;
             const filteredPokemonss = action.payload === "All"
               ? allPokemones
               : allPokemones.filter(pokemon => {
            if (!pokemon.types || !Array.isArray(pokemon.types)) {
                // Si no hay tipos definidos para este Pokémon o no es un array, no lo incluimos
                return false;
            }
            if (Number.isInteger(pokemon.id)) {
                // Para Pokémon provenientes de la API (asumiendo que sus ID son números enteros)
                return pokemon.types.includes(action.payload);
            } else {
                // Para Pokémon de la base de datos (asumiendo que sus ID no son números enteros)
                return pokemon.types.some(tipo => tipo === action.payload);
            }
        });

            return {
                  ...state,
                  pokemones: filteredPokemonss
                 };
        case 'FILTER_CREATED': 
            let filteredPokemons = [];
            if(action.payload === "created"){
                filteredPokemons = state.pokemons;
            }else if (action.payload === "api"){
                filteredPokemons = state.allPokemones.filter(pokemon => Number.isInteger(pokemon.id));
            }else {
                filteredPokemons = state.allPokemones;
            }
            return {
                ...state,
                pokemones: filteredPokemons
            };


        case 'ORDER_POKE_BY_NAME':
                let sortedByName = [...state.allPokemones].sort((a, b) => {
                 return action.payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            });
                 return {
                  ...state,
                  pokemones: sortedByName
            };
    
        

    
        
       
        
      
        case 'ORDER_POKE_BY_ATTACK':
             const sortedByAttack = [...state.allPokemones].sort((a, b) => {
                return action.payload === 'asc' ? a.ataque - b.ataque : b.ataque - a.ataque;
            });
                return {
                   ...state,
                   pokemones: sortedByAttack,
            };
     


                // case 'FILTER_CREATED': {
                //     let filteredPokemons; // Ahora está dentro de un bloque y no debería dar error.
                //     if (action.payload === 'created') {
                //         filteredPokemons = state.allPokemones.filter(pokemon => !Number.isInteger(pokemon.id));
                //     } else if (action.payload === 'api') {
                //         filteredPokemons = state.allPokemones.filter(pokemon => Number.isInteger(pokemon.id));
                //     } else {
                //         filteredPokemons = state.allPokemones;
                //     }
                    
                //     console.log('Filtered Pokemons (before update):', state.pokemones);
    
                //     console.log('Filtered Pokemons (after update):', filteredPokemons);
                    
                //     return {
                //         ...state,
                //         pokemones: filteredPokemons
                //     };
                // }

                // case 'FILTER_CREATED': {
                //     const source = action.payload;
                //     let filteredPokemons;
                
                //     if (source === 'api') {
                //         filteredPokemons = state.allPokemones.filter(pokemon => Number.isInteger(pokemon.id));
                //     } else if (source === 'created') {
                //         filteredPokemons = state.pokemons.filter(pokemon => !Number.isInteger(pokemon.id));
                //     } else {
                //         filteredPokemons = state.allPokemones;
                //     }
                
                //     return {
                //         ...state,
                //         pokemones: filteredPokemons
                //     };
                // }
                
                // Continúa con los demás casos...
                    


        // ... otros casos ...
        default:
            return state;
    }
}

export default rootReducer;
