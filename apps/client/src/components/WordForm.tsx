import { useWords } from '@/hooks';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface WordFormValues {
  definition: string;
  term: string;
}

export const WordForm = () => {
  const { handleSubmit, register, reset } = useForm<WordFormValues>();
  const { addWord, isAddingWord } = useWords();

  const onSubmit: SubmitHandler<WordFormValues> = (data) => {
    addWord(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      className='bg-white shadow-sm mb-8 p-6 border border-slate-100 rounded-2xl w-full max-w-2xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex sm:flex-row flex-col gap-4'>
        <input
          {...register('term', { required: true })}
          className='flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          placeholder='예: Apple'
          type='text'
        />

        <input
          {...register('definition', { required: true })}
          className='flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          placeholder='예: 사과'
          type='text'
        />
        <button
          className='bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 px-6 py-3 rounded-xl font-bold text-white transition-colors'
          disabled={isAddingWord}
          type='submit'
        >
          {isAddingWord ? '추가 중...' : '추가하기'}
        </button>
      </div>
    </form>
  );
};
