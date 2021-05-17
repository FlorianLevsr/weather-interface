import { FC } from 'react';
import { useRouter } from 'next/router';

interface RouterButtonProps {
  path: string,
  text: string
}

const RouterButton: FC<RouterButtonProps> = ({ path, text }) => {

  const router = useRouter();

  const onClickhandler = () => {
    router.push(path);
  };

  return (
    <button onClick={() => onClickhandler()}>{text}</button>
  )

};


export default RouterButton;