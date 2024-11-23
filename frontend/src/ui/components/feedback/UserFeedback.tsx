import styled from 'styled-components';

import { useUserFeedback } from '@/api/user/hooks';
import { FeedbackType } from '@/api/user/types';

const UserFeedback = () => {
  const { data: feedback, isLoading, error } = useUserFeedback();

  if (isLoading) return <div>Loading...</div>;

  if (error)
    return (
      <ErrorMessage>
        An error occurred:
        {error instanceof Error ? error.message : 'Unknown error'}
      </ErrorMessage>
    );

  return (
    <FeedbackContainer type={feedback?.type}>
      <h1>Feedback</h1>
      {feedback?.message}
      {feedback?.suggestion && <Suggestion>{feedback.suggestion}</Suggestion>}
    </FeedbackContainer>
  );
};

const FeedbackContainer = styled.div<{ type: FeedbackType }>`
  background-color: ${(props) =>
    props.type === 'positive' ? '#dff0d8' : '#f2dede'};
  color: ${(props) => (props.type === 'positive' ? '#3c763d' : '#a94442')};
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`;

const Message = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`;

const Suggestion = styled(Message)`
  color: ${(props) => props.theme.secondaryColor || 'grey'};
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  font-size: 1.2em;
`;

export default UserFeedback;
