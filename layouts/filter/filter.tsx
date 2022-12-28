import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Stack,
  Typography,
  InputAdornment,
} from '@mui/material';
import Accordion from 'components/accordion/accordion';
import AccordionSummary from 'components/accordion/accordion-summary';
import Input from 'components/input';
import Select from 'components/select';
import colors from 'config/theme';
import {
  OrderDirection,
  useInitialProductFilterAttributesQuery,
  useCategoryQuery,
} from 'graphql/generated.graphql';
import React, { useEffect } from 'react';
import {
  changePrice,
  clearFilters,
  filterAttributes,
  sort as sortFn,
} from 'redux-state/features/filter';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { FilterBlock, CustomAccordionDetail } from './style-filter';
import { CurensyIcon } from 'components/icons/curensy-icon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Paths } from 'config/site-paths';

const Filter: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const { price, sort } = useAppSelector((state) => state.filter);
  const { data } = useInitialProductFilterAttributesQuery({
    variables: {
      slug: Array.isArray(slug) ? slug[0] : slug || '',
    },
  });
  const { data: categoryAtribute } = useCategoryQuery({
    variables: {
      cursor: '',
      first: 1,
      // @ts-expect-error
      slug: slug ? slug : '',
    },
  });
  const parentCategory = data?.category?.parent;

  const attributes = data?.category?.products?.edges.map((edge) => edge.node);

  const onlyBrend = data?.category?.products?.edges.map((i) => {
    if (i.node.productType.productAttributes) {
      return i.node.productType.productAttributes[0];
    }
  });

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    slug?: string | null
  ) => {
    if (slug) {
      dispatch(
        filterAttributes({
          slug,
          values: [event.target.name],
        })
      );
    }
  };

  const checkBoxStyle = {
    stack: {
      transition: '.3s',
      borderBottom: '0.5px solid #DCDCDC',
      ':hover': { bgcolor: colors.primary.default },
      p: '8px 0',
      alignItems: 'center',
    },
    p: {
      fontWeight: '500',
      p: '16px 12px',
      borderBottom: '0.5px solid #DCDCDC',
    },
  };

  useEffect(() => {
    dispatch(clearFilters());
  }, [router.asPath]);

  const atribute = categoryAtribute?.category?.children?.edges;

  return (
    <FilterBlock>
      <Stack>
        {parentCategory ? (
          <>
            <Stack sx={{ padding: '1rem 0.5rem' }}>
              <Stack border="0.5px solid #DCDCDC">
                {attributes?.map((attr) =>
                  attr.productType.productAttributes?.map((productType) => (
                    <Accordion>
                      <AccordionSummary>
                        <Typography fontWeight={600} variant="subtitle2">
                          {productType?.name}
                        </Typography>
                      </AccordionSummary>
                      <CustomAccordionDetail sx={{ p: 0 }}>
                        {productType?.choices?.edges.map((edge) => (
                          <Stack
                            key={edge.node.id}
                            sx={{ ...checkBoxStyle.stack }}
                            direction="row"
                          >
                            <Checkbox
                              sx={{ '&.Mui-checked': { color: colors.black } }}
                              value={edge.node.id}
                              name={
                                edge.node.slug ||
                                edge.node.name?.toLocaleLowerCase()
                              }
                              onChange={(e) =>
                                handleCheckboxChange(e, productType.slug)
                              }
                            />
                            <Typography variant="subtitle2">
                              {edge.node.name}
                            </Typography>
                          </Stack>
                        ))}
                      </CustomAccordionDetail>
                    </Accordion>
                  ))
                )}
              </Stack>
            </Stack>
            <Stack sx={{ padding: '1rem 0.5rem' }} gap={2}>
              <Select
                onChange={(e) =>
                  //@ts-expect-error
                  dispatch(sortFn({ direction: e.target.value }))
                }
                value={sort?.direction}
                placeholder="Сортировка"
              >
                <MenuItem value={OrderDirection.Asc}>
                  Сначала по дешевле
                </MenuItem>
                <MenuItem value={OrderDirection.Desc}>
                  Сначала по дороже
                </MenuItem>
              </Select>
              <Accordion sx={{ border: '1px solid #e5e5e5' }}>
                <AccordionSummary>
                  <Typography variant="subtitle2">Цена</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack alignItems="center" gap={2} direction="row">
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <CurensyIcon />
                        </InputAdornment>
                      }
                      placeholder={`${price.gte || 0}`}
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(
                          changePrice({
                            type: 'gte',
                            value: parseInt(e.target.value),
                          })
                        )
                      }
                      size="small"
                    />
                    <Box
                      sx={{
                        background: colors.grey.light,
                        height: '2px',
                        width: '1.5rem',
                      }}
                    />
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <CurensyIcon />
                        </InputAdornment>
                      }
                      placeholder={`${price.lte || 0}`}
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(
                          changePrice({
                            type: 'lte',
                            value: parseInt(e.target.value),
                          })
                        )
                      }
                      size="small"
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>
              {/* {attributes?.map((attr) => (
            <FilterItem
              key={attr.id}
              name={attr.name}
              id={attr.id}
              slug={attr.slug}
            />
          ))} */}
            </Stack>
          </>
        ) : (
          <Accordion sx={{ padding: '1rem 0.5rem' }}>
            <AccordionSummary sx={{ border: '0.5px solid #DCDCDC' }}>
              <Typography fontWeight={600} variant="subtitle2">
                Все категории
              </Typography>
            </AccordionSummary>
            {atribute?.map((item) => (
              <Link href={`${Paths.CATEGORY_PRODUCTS}${item.node.slug}`}>
                <Stack
                  border="0.5px solid #DCDCDC"
                  sx={{ ...checkBoxStyle.stack, cursor: 'pointer' }}
                >
                  <Typography
                    boxSizing="border-box"
                    width="100%"
                    p="5px 10px"
                    variant="subtitle2"
                  >
                    {item.node.name}
                  </Typography>
                </Stack>
              </Link>
            ))}
          </Accordion>
        )}
      </Stack>
      <Stack>{children}</Stack>
    </FilterBlock>
  );
};

export default Filter;
