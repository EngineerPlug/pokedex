/*
                        to get a pokemons informatiom from the pokeAPI we will need to create a function that will make the
                        http request for us when we click on the button in the html body

                        to make this function work we are going to need to use the async and await keywords because when we 
                        make our http request the function we are going to use will return a Promise object by default. The async 
                        keyword will give our function that we are creating access to the await keyword. The await keyword can be used with 
                        a promise to automatically resolve the promise when the expected information is received 
                    */

                        const container = document.getElementsByClassName('container');
                        const pokeHeader = document.getElementById("pokeName"); // this references my header element above in the html file
                        const spritesContainer = document.getElementById("spritesContainer");// this references the div above in the html file
                        
                        const typeList = document.getElementById("typeList");
                        const pokeId = document.getElementById("pokeId");
                        
                        const searchButton = document.getElementById("searchButton");
                        const resetBtn = document.getElementById("resetBtn");
                        const moveList = document.getElementById("moveList");
                        
                        async function getPokemonInfo() {
                        // the fetch function lets you make http requests via your webpage
                        let httpResponse  = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId.value}`);
                        console.log(httpResponse); // if you see part of the response object, status: 200 then your request was made
                        // now that we have access to the response, we need to parse out the JSON from the response
                    if(httpResponse.status === 200) {
                            pokeHeader.textContent = "";
                            spritesContainer.innerHTML = ""; // this will remove any previous images in the container
                            typeList.innerHTML = "";
                            moveList.innerHtml = "";
                        // this line below converts the json stored in the response into a javascript object
                        let responseBody = await httpResponse.json();
                        console.log(responseBody);
                        // since I know I have the pokemon info I am going to set the name value for the header above
                        pokeHeader.textContent = responseBody.name;
                        // now I am about to create a bunch of image elements and store them inside the div above
                        // I am gonna need to loop through the sprites object
                        for(let key in responseBody.sprites) {
                            // before we add the new image elements we need to make sure there is an actual image to place
                            if (responseBody.sprites[key] && key != "other" && key != "versions") {
                         console.log(responseBody.sprites[key]); 
                         let img = document.createElement("img");
                         // assing the image to the element
                         img.src = responseBody.sprites[key]; // to acces the keys of the nested objects you have to use square brackets
                         // assign the alternate text
                         img.alt= "image not found";
                         // place the image inside of the div we created above
                         spritesContainer.appendChild(img); // code will go here
                            }
                        }
                        // now i am going to generate list item elements to fill the unordered list for the pokemon types
                        /*
                        to access the actual pokemon types we need to access some VERY nested information
                        types is the key word to reference an array.
                        the index positions of the array are references to objects, type is the key word that references the actual type that we want
                        
                        to handle this amount of nested information, we will loop through the array and reference the content
                        we need from the objects we get access to in the array
                        */
                       for(let object of responseBody.types) {
                        console.log(object.type.name);
                        // now that we know how to actually access the types we can create list items and store their values in
                        let li = document.createElement("li");
                        // then we set the text content of the list item
                        li.textContent = object.type.name;
                        // then we append the list item inside of the type unordered list
                        typeList.appendChild(li);
                       }
                       /* 
                       and finally, we have the moves to work with: the names of the moves are stored in an array
                       inside of an object, inside of another object, so we need to parse it out
                       */
                      for (let object of responseBody.moves) {
                        console.log(object.move.name);
                        let li = document.createElement("li");
                        li.textContent = object.move.name;
                        moveList.appendChild(li);
                      }
                       } else {
                        console.log("it got away!");
                       }
                        }
                        /* Reset button formula */
                        function resetPage() {
                            spritesContainer.reset();
                        }
                         resetBtn.addEventListener('click', resetPage);
                         searchButton.addEventListener('click', getPokemonInfo);