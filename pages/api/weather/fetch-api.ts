import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { default as slugify } from 'slugify';
import Cookie from "cookie";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {

    const { city, cookie } = request.body;
    const { API_KEY, COOKIE_EXPIRATION_TIME } = process.env;
    let formattedData;
    let formattedCookie;
    let parsedCookie;

    if (typeof API_KEY === 'undefined') {
      throw new Error('API key is missing in environment variables!');
    }

    if (typeof COOKIE_EXPIRATION_TIME === 'undefined') {
      throw new Error('Cookie expiration time is missing in environment variables!');
    }

    if(typeof cookie !== 'undefined') {
      parsedCookie = Cookie.parse(cookie)
    }

    const slugifiedCity = slugify(city, { lower: true, remove: /[*+~.()'"!:@]/g });

    if(typeof parsedCookie !== 'undefined' && parsedCookie[slugifiedCity]) {

      console.log('Recherche: ', city, ' // recherche ultérieure disponible en cookie')

      formattedData = JSON.parse(parsedCookie[slugifiedCity]);

      formattedCookie = { data: JSON.parse(parsedCookie[slugifiedCity]), name: slugifiedCity, expiration: new Date( new Date(JSON.parse(parsedCookie[slugifiedCity]).date).getTime() + parseInt(COOKIE_EXPIRATION_TIME, 10))};
      
      return response.status(200).json({ data: formattedData, cookie: formattedCookie });

    }

    console.log('Recherche: ', city, ' // aucune recherche ultérieure trouvée en cookie - api call')

    const finalCityFormat = slugifiedCity.replace(/-/g, ' ');
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${finalCityFormat}&appid=${API_KEY}&units=metric&lang=fr`);

    formattedData = {
      city: result.data.name,
      country: result.data.sys.country,
      temperature: `${result.data.main.temp}°C`,
      sky: result.data.weather[0].description,
      humidity: `${result.data.main.humidity}%`,
      date: new Date()
    };

    formattedCookie = { data: formattedData, name: slugifiedCity, expiration: new Date(new Date().getTime() + parseInt(COOKIE_EXPIRATION_TIME, 10)) };

    response.status(200).json({ data: formattedData, cookie: formattedCookie });

  } catch (error) {
    response.status(500).json({ statusCode: 500, message: error.message });
  }

};

export default handler;