import { createWord, deleteWord, fetchWords } from '@/api';
import { useMutationFeedback } from '@/hooks/useMutationFeedback';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useWords = () => {
  const addFeedback = useMutationFeedback('POST', ['words']);
  const removeFeedback = useMutationFeedback('DELETE', ['words']);

  const {
    data: words,
    isLoading: isWordsLoading,
    isError: isWordsError,
    error: wordsError,
  } = useQuery({
    queryFn: fetchWords,
    queryKey: ['words'],
  });

  const { mutate: addWord, isPending: isAddingWord } = useMutation({
    mutationFn: createWord,
    ...addFeedback,
  });

  const { mutate: removeWord, isPending: isRemovingWord } = useMutation({
    mutationFn: deleteWord,
    ...removeFeedback,
  });

  return {
    words,
    isWordsLoading,
    isWordsError,
    wordsError,

    addWord,
    isAddingWord,

    removeWord,
    isRemovingWord,
  };
};
