import { Chapter } from '@prisma/client';

interface QuizCardsProps {
  chapter: Chapter & {

  }

}

export const QuizCards: React.FC<QuizCardsProps> = async () => {
  return (
    <div>
      QuizCards
    </div>
  );
}