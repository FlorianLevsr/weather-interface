import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { default as slugify } from 'slugify';

const SearchPage = () => {

  const router = useRouter();

  const [searchInput, setSearchInput] = useState('');

  const controlledSearchInputHandler = (input: string) => {
    setSearchInput(input);
  }

  const submitHandler = (event: FormEvent) => {

    event.preventDefault();

    if (!searchInput) {
      return;
    };

    const slugifiedInput: string = slugify(searchInput, { lower: true, remove: /[*+~.()'"!:@]/g });
    router.push(`/weather/${slugifiedInput}`)
  }

  return (

    <form onSubmit={(event) => submitHandler(event)}>

      <label>Rechercher la météo d'une ville:</label>
      <input placeholder={searchInput ? searchInput : "Ville..."} type="text" onChange={(event) => controlledSearchInputHandler(event.target.value)} />
      <button type="submit">Rechercher</button>

    </form>

  )

};

export default SearchPage;