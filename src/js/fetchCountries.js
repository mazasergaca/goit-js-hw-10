export function fetchCountries(name) {
  if (name !== '') {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(response => {
      if (!response.ok) {
        let error = new Error(response.statusText);
        throw error;
      }
      return response.json();
    });
  }
}
