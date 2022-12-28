import { NextPage } from 'next';
import React from 'react';
import { Main } from 'layouts/main';
import { Container, Typography } from '@mui/material';
import { Breadcrumb } from 'components/breadcrumbs';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styled from 'styled-components';

const CompInfoLink = styled.span`
  a{
    color:#E44542 ;
  }
`


const compInfo: NextPage = () => {
  const { t } = useTranslation()
  const links = [
    {
      name: 'О компании',
    }
  ]

  return (
    <Main >
      <Container maxWidth="xl">
        <div style={{ marginTop: '12px' }}>
          <Breadcrumb data={links} />
        </div>
        <Typography variant='h2' mb={3} mt={2} sx={{ fontWeight: '400' }}>О компании</Typography>
        <Typography variant='body1' mb={2}>{t("compInfo-text1")}</Typography>
        <Typography variant='body1' mb={2}>{t("compInfo-text2")}</Typography>
        <Typography variant='body1' mb={2}>{t("compInfo-text3")}</Typography>
        <Typography variant='body1' mb={2}>{t("compInfo-text4")}</Typography>
        <Typography variant='body1' mb={2}>{t("compInfo-text5")}</Typography>
        <Typography variant='body1' mb={2}>{t("compInfo-text6")}</Typography>
        <Typography variant='body1' mb={2}>{t("compInfo-text7")}</Typography>
        <Typography variant='h2' sx={{ fontSize: '16px' }} mb={2}>{t("compInfo-list")}</Typography>
        <div style={{ marginLeft: '40px' }}>
          <Typography variant='body1'>{t("compInfo-item1")}</Typography>
          <Typography variant='body1'>{t("compInfo-item2")}</Typography>
          <Typography variant='body1'>{t("compInfo-item3")}</Typography>
          <Typography variant='body1'>{t("compInfo-item4")}</Typography>
          <Typography variant='body1'>{t("compInfo-item5")}</Typography>
          <Typography variant='body1'>{t("compInfo-item6")}</Typography>
          <Typography variant='body1' mb={2}>{t("compInfo-item7")}</Typography>
        </div>
        <Typography variant='body1' mb={2}>___</Typography>
        <Typography variant='body1' mb={2}>
          {t("compInfo-lastText1")}
          <span style={{ color: '#E44542' }} > Меню и страницы</span>
        </Typography>
        <Typography variant='body1' mb={6}>
          {t("compInfo-lastText2")}
          <CompInfoLink>
            <Link href='/'> https://www.Gipermart.uz/collection/doc-settings/product/razdel-menyu</Link>
          </CompInfoLink>

        </Typography>

      </Container>
    </Main>
  )
}

export default compInfo;