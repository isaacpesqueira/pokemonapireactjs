import React, { useEffect, useState } from 'react';
import './index.css';


function App() {
  
const [paginado, setpaginado] = useState(0);

  const [result, setResult] = React.useState([]);
  const [poke, setPoke] = React.useState([]);
  const [load, setLoad] = React.useState('true');
 
  const arr = [];

  //hook avisamos que va a cambiar
  var amount_show=5; 
 
  
  function nextPage(){
    var incremento=(parseInt(localStorage.getItem("num_pagina"))+5);
    localStorage.setItem("num_pagina",incremento );
    setpaginado(localStorage.getItem("num_pagina"));
    load_pokemons();
  
}
function load_pokemons()
{
   setLoad(true);
  fetch('https://pokeapi.co/api/v2/pokemon/?offset='+localStorage.getItem("num_pagina")+'&limit='+amount_show)
  .then((response) => response.json())
  .then((data) => setResult(
    data.results.map((item) => {
      fetch(item.url)
        .then((response) => response.json())
        ///agregagmos al arreglo pokemons
        .then((allpokemon) => arr.push(allpokemon));
        setPoke(arr);
        ///agregamos al hook para que se actualize
        
        
    }),
  ));

}


  useEffect(() => {
 fetch('https://pokeapi.co/api/v2/pokemon/?offset='+localStorage.getItem("num_pagina")+'&limit='+amount_show)
      .then((response) => response.json())
      .then((data) => setResult(
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => response.json())
            ///agregagmos al arreglo pokemons
            .then((allpokemon) => arr.push(allpokemon));
            setPoke(arr);
            ///agregamos al hook para que se actualize
            
            
        }),
      ));
 
  }, []);

   setTimeout(() => {

    ///comprobamos con el hook que se cargo
    setLoad(false);
     //ver el json en consola   
     console.log(poke);
   }, 1200);
 
  return (
    <div className="App">

<center> <h2> Pokedex App </h2> </center>
     
    <div class="info">  <p>Pokemons: {parseInt((localStorage.getItem("num_pagina"))-5)} - {localStorage.getItem("num_pagina")} </p>
<button onClick={()=> nextPage()}>Siguiente</button>
</div>
        { load ? (
          <center>
            <img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves"  width="250" />
  <p>Cargando...</p></center>
 
        ) : (

          poke.map((img, i) => (
            <div class="grid-container"  id={img.id} key={img.id}>
          
              
              <div  class="grid-item" style={{ width: '10rem', height: '15rem', backgroundColor: '#F0F0C9' }}>
                <img  src={img.sprites.front_default} alt='pokemon' />
    
                  <h5 >{img.name}</h5>
                  <h6>Type {img.types[0].type.name}</h6>
                  <h6>Exp. {img.base_experience}</h6>
                  <h6>Weight. {img.weight} Kg</h6>
                  <h6>Height. {img.height} Ft</h6>
                 
              </div>
              
              </div>

          
          ))
        )}
<center> <p><span>Created By Isaac Pesqueira </span></p></center>


</div>
    
  );
}

export default App;