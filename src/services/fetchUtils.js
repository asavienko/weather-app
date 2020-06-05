const target = 'http://api.openweathermap.org/';
const checkResponseSuccess = (response) => {
  if (!response.ok) throw new Error();
};

async function request(url, method, body) {
  try {
    const targetURL = new URL(url, target);
    const response = await fetch(targetURL, {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
    checkResponseSuccess(response);
    return response.json();
  } catch (e) {
    throw new Error(e);
  }
}

export const getRequest = async (url) => request(url, 'GET');

export const postRequest = async (url, body = {}) => request(url, 'POST', body);

export const putRequest = async (url, body = {}) => request(url, 'PUT', body);

export const deleteRequest = async (url) => request(url, 'DELETE');
