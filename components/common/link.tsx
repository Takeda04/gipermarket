import colors from 'config/theme';
import Link from 'next/link';
import styled from 'styled-components';

export const LinkButton = styled.a`
  background: ${colors.primary.default};
  padding: .5rem 3rem;
  text-decoration: none;
  font-size: 1.25rem;
  cursor: pointer;
`;
