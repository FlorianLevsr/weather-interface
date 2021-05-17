import { FC, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import SearchResult from '../../components/SearchResult';
import RouterButton from '../../components/RouterButton';

interface ResultPageProps {
  data: ResultPageData,
  cookie: ResultPageCookie
}

interface ResultPageData {
  city: string,
  country: string,
  temperature: string,
  sky: string,
  humidity: string,
  date: Date
}

interface ResultPageCookie {
  data: ResultPageData,
  name: string,
  expiration: Date
}

const ResultPage: FC<ResultPageProps> = (resultPageProps) => {

  useEffect(() => {

    if(!resultPageProps.cookie) return;
    Cookies.set(resultPageProps.cookie.name, JSON.stringify(resultPageProps.cookie.data), { expires: new Date(resultPageProps.cookie.expiration), path: '' });

  }, []);

  return (

    <div>
      {typeof resultPageProps.data === 'undefined' ? <div>Ville introuvable!</div> : <SearchResult {...resultPageProps.data} />}
      <RouterButton path='/weather/search' text='Effectuer une autre recherche' />
    </div>

  )
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const baseUrl = 'https://weather-interface.netlify.app';
  const result = await fetch( baseUrl + '/pages/api/weather/fetch-api', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ city: query.city, cookie: req.headers.cookie })
  });

  const data = await result.json();
  return { props: data };

}

export default ResultPage;