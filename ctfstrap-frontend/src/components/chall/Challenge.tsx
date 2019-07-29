import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

interface ChallContainerProps {
  solved: boolean;
}

const ChallContainer = styled.div<ChallContainerProps>`
  display: inline-block;
  background-color: ${palette.gray50};
  border-radius: 5px;

  flex-basis: 20%;
  flex-grow: 1;
  flex-shrink: 1;

  min-width: 12rem;
  margin: 1rem;

  text-align: center;

  ${props =>
    props.solved &&
    css`
      background-color: ${palette.primary600};
      color: white;
    `}
`;

const ChallTitle = styled.h3``;

const ChallPoints = styled.p``;

interface ChallengeProps {
  title: string;
  points: number;
  solved: boolean;
}

const Challenge: React.FC<ChallengeProps> = ({ title, points, solved }) => {
  return (
    <ChallContainer solved={solved}>
      <ChallTitle>{title}</ChallTitle>
      <ChallPoints>{points}pts</ChallPoints>
    </ChallContainer>
  );
};

export default Challenge;
