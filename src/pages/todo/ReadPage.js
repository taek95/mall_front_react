import React from 'react';
import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/todo/ReadComponent';

const ReadPage = () => {

  // useParams로 해당 페이지의 pathVariable 값 얻을수 있음
  const {tno} = useParams()

  return (
    <div className={'font-extrabold w-full bg-white mt-6'}>
      <div className={'text-2xl'}>
      Todo Read Page Component {tno}
      </div>
      <ReadComponent tno={tno}/>
    </div>
  );
}

export default ReadPage;