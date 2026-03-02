import '@/App.css';
import { WordCard, WordForm } from '@/components';
import { useWords } from '@/hooks';

const App = () => {
  const { words, isWordsLoading, isWordsError, wordsError } = useWords();

  return (
    <div className='flex flex-col items-center bg-slate-50 px-4 py-12 min-h-screen'>
      <h1 className='mb-8 font-bold text-slate-800 text-4xl'>📚 My English Flashcards</h1>

      {/* 폼 */}
      <WordForm />

      {/* 로딩 상태 처리 */}
      {isWordsLoading && (
        <p className='text-slate-500 text-lg animate-pulse'>단어장을 불러오는 중입니다...</p>
      )}

      {/* 에러 상태 처리 */}
      {isWordsError && wordsError && (
        <p className='bg-red-50 p-4 rounded-lg text-red-500'>
          에러가 발생했습니다: {wordsError.message}
        </p>
      )}

      {/* 데이터 렌더링 */}
      {words && (
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl'>
          {words.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
