import { useState } from 'react';

import { useWords } from '@/hooks';
import { type SubmitHandler, useForm } from 'react-hook-form';

import type { Word } from '@repo/schema';

type EditWordFormValues = {
  term: string;
  definition: string;
};

interface WordCardProps {
  word: Word;
}

export const WordCard = ({ word }: WordCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { editWord, isEditingWord, removeWord, isRemovingWord } = useWords();

  const { handleSubmit, register, reset } = useForm<EditWordFormValues>({
    defaultValues: {
      term: word.term,
      definition: word.definition,
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this word?')) {
      removeWord(word.id);
    }
  };

  const onSubmit: SubmitHandler<EditWordFormValues> = (data) => {
    editWord(
      {
        id: word.id,
        term: data.term,
        definition: data.definition,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className='bg-white p-6 rounded-2xl shadow-sm border border-blue-200 ring-2 ring-blue-50 flex flex-col h-56'>
        <form className='flex flex-col h-full justify-between' onSubmit={handleSubmit(onSubmit)}>
          <input
            className='px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg text-blue-600'
            type='text'
            {...register('term', { required: true })}
          />
          <input
            className='px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600'
            type='text'
            {...register('definition', { required: true })}
          />
          <div className='flex justify-end gap-2 mt-2'>
            <button
              className='px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-xl transition-colors'
              disabled={isEditingWord}
              onClick={handleCancel}
              type='button'
            >
              {'취소'}
            </button>
            <button
              className='px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:bg-slate-400'
              disabled={isEditingWord}
              type='submit'
            >
              {isEditingWord ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className='relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col justify-center items-center h-56 text-center'>
      <div className='absolute top-4 right-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity'>
        <button
          aria-label='Edit word'
          className='text-slate-300 hover:text-blue-500 transition-colors'
          onClick={() => setIsEditing(true)}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            strokeWidth={1.5}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <button
          aria-label='Delete word'
          className='text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50'
          disabled={isRemovingWord}
          onClick={handleDelete}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            strokeWidth={1.5}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>

      <h2 className='text-2xl font-bold text-blue-600 mb-2'>{word.term}</h2>
      <p className='text-slate-600 text-lg'>{word.definition}</p>
    </div>
  );
};
