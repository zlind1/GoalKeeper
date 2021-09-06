
const endpointURL = 'http://localhost:5000';

const api = {
  post: async (route, body) => {
    const apiResponse = await fetch(endpointURL+route, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const response = {
      ok: apiResponse.ok
    }
    const data = await apiResponse.json();
    for (const key of Object.keys(data)) {
      response[key] = data[key];
    }
    return response;
  }
}

export default api;
