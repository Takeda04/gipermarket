import Search from 'components/icons/search';
import Input from 'components/input';
import useDebounce from 'hooks/use-debounce';
import React, { useCallback, useRef, useState } from 'react';
import { useSearchProductsQuery } from 'graphql/generated.graphql';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import colors from 'config/theme';
import { useOutsideAlerter } from 'hooks/use-outside-click';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import styled from 'styled-components';

const StyleInput = styled(Input)`
  width: 655px;
  @media (max-width: 1551px) {
    width: 598px;
  }
  @media (max-width: 1489px){
    width: 505px;
  }
  @media (max-width: 1387px) {
    width: 443px;
  }
  @media (max-width:1348px){
    width: 380px;

  }
  @media (max-width:1287px){
    width: 349px;
  }
  @media (max-width: 1247px) {
    width: 260px

  }
  @media (max-width: 1135px) {
    width: 100%;
  }
`;

const SearchField = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const listRef = useRef(null);
  const defferedInputValue = useDebounce(inputValue, 600);
  const { data, loading } = useSearchProductsQuery({
    variables: { search: defferedInputValue },
    skip: defferedInputValue.length < 1,
  });
  const navigator = useRouter();
  const { query: searchQuery } = navigator.query;
  const query = new URLSearchParams(`query=${inputValue}`);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    navigator.push(`${Paths.SEARCH}?${query.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useOutsideAlerter(listRef, () => setIsOpen(false));

  return (
    <Box ref={listRef} position="relative">
      <form onSubmit={handleSubmit}>
        <StyleInput
          placeholder="Поиск"
          value={inputValue}
          onChange={handleChange}
          endAdornment={loading ? <CircularProgress size={18} /> : <Search />}
          fullWidth
          onClick={() => setIsOpen(true)}
        />
      </form>
      {isOpen && (
        <List
          sx={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            backgroundColor: colors.white,
          }}
        >
          {data?.products?.edges.map((prod) => (
            <ListItem
              onClick={() =>
                navigator.push(`${Paths.PRODUCT_DETAILS}${prod.node.slug}`)
              }
              key={prod.node.id}
              button
            >
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText>{prod.node.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchField;
