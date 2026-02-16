import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { MessageCategory } from '../backend';

interface SubmitFeedbackParams {
  name: string | null;
  email: string | null;
  message: string;
  category: MessageCategory;
}

export function useSubmitFeedback() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitFeedbackParams) => {
      if (!actor) {
        throw new Error('Backend actor not available');
      }

      await actor.submitFeedback(
        params.name,
        params.email,
        params.message,
        params.category
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
  });
}
