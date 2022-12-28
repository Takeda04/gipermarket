import {
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import Accordion from 'components/accordion/accordion';
import AccordionSummary from 'components/accordion/accordion-summary';
import { useSearchAttributeValuesQuery } from 'graphql/generated.graphql';
import React from 'react';
import { filterAttributes } from 'redux-state/features/filter';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';

interface FilterItemProps {
  name?: string | null;
  id?: string | null;
  slug?: string | null;
}

const FilterItem: React.FC<FilterItemProps> = ({ name, id, slug }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { attributes } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const { data } = useSearchAttributeValuesQuery({
    variables: {
      first: 50,
      id,
      query: '',
    },
    skip: !expanded,
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (slug) {
      dispatch(
        filterAttributes({
          slug,
          values: [event.target.name],
        })
      );
    }
    console.log(event);
  };

  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
    >
      <AccordionSummary>
        <Typography variant="subtitle2">{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup sx={{ gap: 0 }}>
          {/* {choices?.map((choice) => (
            <FormControlLabel
              key={choice.id}
              control={
                <Checkbox
                  color="primary"
                  onChange={handleCheckBoxChange}
                  name={choice.slug || ''}
                />
              }
              label={choice.name || ''}
            />
          ))} */}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterItem;
