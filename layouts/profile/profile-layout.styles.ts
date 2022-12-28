import styled from 'styled-components';

export const ProfileLayoutLink = styled.div<{ isActive?: boolean }>`
  padding: 1rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1.5px solid ${({ isActive }) => (!isActive ? '#808080' : '#000000')};
  cursor: pointer;
  @media (max-width:899px) {
    margin-bottom: 12px;
  }
`;
