export function fetchCountries(name) {
  return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`)
      .then(response => {
          if (!response.ok) {
              throw Error(response.statusText);
          }
          return response.json();
         })
      .catch(error => {
          console.log(error)
      });
};


// export async function fetchCountries(name) {
//     try {
//         const response = await fetch(
//         `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`)
        
//         const countryParse = await response.json()
//         return countryParse 
//     } catch (error) {
//         console.log(error)
//     }   
// };