import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
interface BreadProp {
  data: {
    name?: string;
    link?: string;
  }[];
}

export const Breadcrumb: React.FC<BreadProp> = ({ data }) => {
  const allElements = [...data];
  const lastElement = allElements.splice(data.length - 1, 1);

  return (
    <Breadcrumbs sx={{ pt: '12px', pb: '12px' }}>
      <Typography>
        <Link href="/">
          <a>Магазин</a>
        </Link>
      </Typography>
      {data.slice(0, data.length - 1).map((links) => (
        <Typography key={links.name} variant="subtitle2">
          <Link href={links.link || ""}>
            {links?.name}
          </Link>
        </Typography>
      ))}
      <Typography sx={{ fontWeight: '600' }} variant="subtitle2">
        {lastElement[0].name}
      </Typography>
    </Breadcrumbs>
  );
};
