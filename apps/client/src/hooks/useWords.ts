import { createWord, deleteWord, fetchWords, updateWord } from '@/api';
import { useMutationFeedback } from '@/hooks/useMutationFeedback';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useWords = () => {
  const addFeedback = useMutationFeedback('POST', ['words']);
  const editFeedback = useMutationFeedback('PUT', ['words']);
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

  const { mutate: editWord, isPending: isEditingWord } = useMutation({
    mutationFn: updateWord,
    ...editFeedback,
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

    editWord,
    isEditingWord,

    removeWord,
    isRemovingWord,
  };
};
