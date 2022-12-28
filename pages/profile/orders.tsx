import React from 'react';
import { NextPage } from 'next';
import { OrderTitle } from 'components/orders';
import { OrdersCard } from 'components/cards';
import { ProfileLayout } from 'layouts/profile';
import { Main } from 'layouts/main';
import { OrderIstalments } from 'components/cards/order-istalments';
import { useInstalmetsOrderQuery } from 'graphql/generated.graphql';
import { BackArrow } from 'components/icons/back-arrow';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useGetSpecialOrderQuery } from 'graphql/generated.graphql';
import { WithAuth } from 'components/private-route';
import { Paths } from 'config/site-paths';
import { SpecialOrderCard } from 'components/cards/special-order-card';
import { Select, MenuItem, useMediaQuery } from '@mui/material';
import { useAppSelector } from 'redux-state/hook';
import { InfiniteLoader } from 'components/loaders/infinite-loader';
import { Container, Stack, Typography, Skeleton, Tabs, Tab, Box } from '@mui/material';
import { useOrdersQuery } from 'graphql/generated.graphql';
import { Breadcrumb } from 'components/breadcrumbs';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const orders: NextPage = () => {

  const { data, loading, fetchMore } = useOrdersQuery({
    variables: {
      first: 10,
    },
  });
  const router = useRouter();
  const { t } = useTranslation();
  const links = [
    {
      name: 'Личный кабинет',
      link: Paths.PROFILE,
    },
    {
      name: 'Orders',
      link: Paths.ORDERS,
    },
  ];
  const md = useMediaQuery('(max-width:899px)');
  const orders = data?.me?.orders?.edges.map((edge) => edge.node);
  const pageInfor = data?.me?.orders?.pageInfo;
  const specialOrderID = localStorage.getItem('specialOrderID')
  const { phone: userPhone, userId } = useAppSelector((state) => state.user.user)
  const { data: specialData, } = useGetSpecialOrderQuery({
    variables: {
      phone: userPhone ? userPhone : ""
    }
  })


  const { data: instalmentsData } = useInstalmetsOrderQuery({
    variables: {
      first: 100,
      id: userId ? userId : '',
    }
  })
  const instalmentsList = instalmentsData?.contracts?.edges;



  const specials = specialData?.specialOrderByPhone;

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Main>
      <Container maxWidth="xl">
        {!md && <Breadcrumb data={links} />}
        <ProfileLayout
          loading={loading}
          loadingFallBack={
            <Stack gap="1rem">
              <Typography variant="h2">
                <Skeleton variant="text" width="40%" />
              </Typography>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </Stack>
          }
        >
          {!md ? (
            // <OrderTitle>Мои заказы</OrderTitle>
            ""
          ) : (
            <>
              <Stack
                onClick={() => router.back()}
                margin="16px 0"
                direction={'row'}
                gap="18px"
                alignItems="center"
              >
                <BackArrow />
                <Typography variant="h2">Мои заказы</Typography>

              </Stack>

            </>

          )}
          <Tabs sx={{ marginBottom: '20px' }} value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="заказы" {...a11yProps(0)} />
            <Tab label="Cпецзаказ" {...a11yProps(1)} />
            <Tab label="рассрочки " {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            {orders?.length ? (
              <InfiniteLoader
                loadMore={() =>
                  fetchMore({
                    variables: {
                      cursor: pageInfor?.endCursor,
                    },
                  })
                }
                hasMore={pageInfor?.hasNextPage}
                loading={loading}
              >
                {orders.map((order) => (
                  <OrdersCard key={order.id} order={order} />
                ))}
              </InfiniteLoader>
            ) : (
              <Typography sx={{ textAlign: 'center' }} variant="h2">
                {t('emty')}
              </Typography>

            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {specials?.length ?
              <>
                {specials?.map((item, i) => (
                  <React.Fragment key={i}>
                    {item ?
                      <SpecialOrderCard
                        orderUrl={item?.url}
                        status={item?.status}
                        userName={item?.user?.firstName ? item?.user?.firstName : ''}
                      />
                      :
                      ""
                    }

                  </React.Fragment>

                ))}
              </> :
              <Typography sx={{ textAlign: 'center' }} variant="h2">
                {t('emty')}
              </Typography>

            }

          </TabPanel>
          <TabPanel value={value} index={2}>
            {instalmentsList?.length ?
              <>
                {instalmentsList?.map((item) => (
                  <OrderIstalments
                    createdAt={item?.node?.createdAt}
                    limit={item?.node?.limit ? item?.node?.limit : 0}
                    status={item?.node?.status ? item?.node?.status : ''}
                    totalCount={item?.node?.totalCount ? item?.node?.totalCount : 0}
                    totalPrice={item?.node?.totalPrice ? item?.node?.totalPrice : 0}
                  />
                ))}
              </> :
              <Typography sx={{ textAlign: 'center' }} variant="h2">
                {t('emty')}
              </Typography>
            }
            {instalmentsList?.map((item) => (
              <OrderIstalments
                createdAt={item?.node?.createdAt}
                limit={item?.node?.limit ? item?.node?.limit : 0}
                status={item?.node?.status ? item?.node?.status : ''}
                totalCount={item?.node?.totalCount ? item?.node?.totalCount : 0}
                totalPrice={item?.node?.totalPrice ? item?.node?.totalPrice : 0}
              />
            ))}
          </TabPanel>
        </ProfileLayout>
      </Container>
    </Main>
  );
};

export default WithAuth(orders);
