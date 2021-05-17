import React, { FC } from 'react';
import moment from 'moment';

interface SearchResultData {
  city: string,
  country: string,
  temperature: string,
  sky: string,
  humidity: string,
  date: Date
}

const Result: FC<SearchResultData> = ({ city, country, temperature, sky, humidity, date }) => {

  return (

    <div>
      <p>{city} ({country})</p>
      <p>Température: {temperature}</p>
      <p>Ciel: {sky}</p>
      <p>Taux d'humidité: {humidity}</p>
      <p>Dernière recherche effectuée à {moment(date).format("HH:mm")}</p>
      <p>Rafraichissement des données toutes les 10 minutes.</p>
    </div>

  )

};
  

export default Result;