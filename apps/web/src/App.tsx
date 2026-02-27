import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Word } from '@repo/schema';

import './App.css';

const fetchWords = async (): Promise<Word[]> => {
  const response = await axios.get<Word[]>('http://localhost:3001/api/words');

  return response.data;
};

const App = () => {
  const {
    data: words,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryFn: fetchWords,
    queryKey: ['words'],
  });

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4'>
      <h1 className='text-4xl font-bold text-slate-800 mb-8'>📚 My English Flashcards</h1>

      {/* 로딩 상태 처리 */}
      {isLoading && (
        <p className='text-slate-500 animate-pulse text-lg'>단어장을 불러오는 중입니다...</p>
      )}

      {/* 에러 상태 처리 */}
      {isError && (
        <p className='text-red-500 bg-red-50 p-4 rounded-lg'>
          에러가 발생했습니다: {error.message}
        </p>
      )}

      {/* 데이터 렌더링 */}
      {words && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl'>
          {words.map((word) => (
            <div
              key={word.id}
              className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group'
            >
              <h2 className='text-2xl font-bold text-blue-600 mb-2 group-hover:text-blue-700'>
                {word.term}
              </h2>
              <p className='text-slate-600 text-lg'>{word.definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
