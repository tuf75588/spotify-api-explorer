// thanks to Kent C. Dodds for the idea for this native client wrapper around fetch!

function client(endpoint: string, ...customConfig: object[]) {
  // check if there is a token in localStorage
  const config = {
    method: 'GET',
    ...customConfig,
  };
  return window.fetch(endpoint, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      // promise was fulfilled
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export default client;
