import { CircularProgress, Grid, Paper } from '@mui/material';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import colors from 'config/theme';
import { useRootCategoriesQuery } from 'graphql/generated.graphql';
import React from 'react';
import styled from 'styled-components';
import CatalogItem from './catalog-item';

const Wrapper = styled.div`
  padding: 52px 104px;
  background-color: ${colors.white};
  max-width: 1087px;
  display: flex;
  @media (max-width: 492px){
    padding: 40px;
  }
`;

const Catalog = () => {
  const { data, loading, fetchMore } = useRootCategoriesQuery({ variables: { first: 100 } })


  const nodes = data?.categories?.edges.map((category) => category.node).filter((item) => item.children?.edges.length)
  const pageInfo = data?.categories?.pageInfo;


  if (loading) {
    return (
      <Wrapper>
        <CircularProgress color="primary" size={50} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Grid
        mb="2rem"
        justifyContent="space-between"
        rowGap="1rem"
        columnSpacing={2}
        container
      >
        <InfiniteLoader
          loadMore={() =>
            fetchMore({ variables: { cursor: pageInfo?.endCursor } })
          }
          hasMore={pageInfo?.hasNextPage}
        >
          {nodes?.map((node) => (
            <Grid justifyContent="flex-start" item lg={4} md={6} sm={12} xs={12}>
              <CatalogItem
                key={node?.id}
                title={node?.name}
                image={node?.backgroundImage}
                slug={node?.slug}
                children={node?.children?.edges.map((child) => ({
                  title: child.node.name,
                  slug: child.node.slug,
                }))}
              />
            </Grid>
          ))}
        </InfiniteLoader>
      </Grid>
    </Wrapper>
  );
};

export default Catalog;
