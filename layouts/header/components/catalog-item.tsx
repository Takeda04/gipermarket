import { Button } from 'components/button';
import { CategoryCard } from 'components/cards';
import ArrowDown from 'components/icons/arrow-down';
import { Paths } from 'config/site-paths';
import colors from 'config/theme';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

interface CatalogItemProps {
  image?: { alt?: string | null; url: string } | null;
  title?: string;
  slug?: string;
  children?: {
    title: string;
    slug: string;
  }[];
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  a:hover {
    color: ${colors.primary.hover};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.black};
  cursor: pointer;
`;

const CatalogItem: React.FC<CatalogItemProps> = ({
  image,
  title,
  children,
  slug,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ItemWrapper>
      <Link href={`${Paths.CATEGORY_PRODUCTS}${slug}`}>
        <CategoryCard slug={slug} label={title} image={image} />
      </Link>
      {children?.slice(0, expanded ? children.length : 3).map((child) => (
        <StyledLink href={`${Paths.CATEGORY_PRODUCTS}${child.slug}`}>
          {child.title}
        </StyledLink>
      ))}
      {children && children?.length > 3 && (
        <Button
          variant="text"
          size="small"
          sx={{ maxWidth: 'max-content' }}
          endIcon={
            <ArrowDown
              style={{ transform: `rotate(${expanded ? '180deg' : 0})` }}
            />
          }
          color="secondary"
          onClick={() => setExpanded(!expanded)}
        >
          Показать все
        </Button>
      )}
    </ItemWrapper>
  );
};

export default CatalogItem;
