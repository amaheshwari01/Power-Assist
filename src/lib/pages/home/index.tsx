import { Box, Button, Grid, Skeleton, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import Loading from '~/lib/components/render/Loader';
import FullRender from '~/lib/components/render/full';
import { Login } from '~/lib/components/render/login';
import { usePullToRefresh } from 'use-pull-to-refresh';

import AppContext from '~/lib/utils/AppContext'; // const fs = window.require('fs')
const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 10;
// import ReactPullToRefresh from 'react-pull-to-refresh';
const Home = () => {
  const { data, refresh_token } = useContext(AppContext);
  const [refresthing, setRefreshing] = useState(false);

  const { isRefreshing, pullPosition } = usePullToRefresh({

    onRefresh: async () => {
      // Your refresh function here
      // console.log('Page was pulled down!');
      setTimeout(() => {
        setRefreshing(false)
      }
        , 10000);
    },
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
    isDisabled: false
  });
  useEffect(() => {
    if (isRefreshing) {
      setRefreshing(true)
    }
  }, [isRefreshing])


  return <>
    <div
      style={{
        backgroundColor: '#f7fafc', // bg-base-100
        position: 'fixed',
        left: '50%', // inset-x-1/2
        zIndex: 30, // z-30
        height: '3rem', // h-8
        width: '3rem', // w-8
        transform: 'translateX(-50%)', // -translate-x-1/2
        borderRadius: '9999px', // rounded-full
        padding: '0.5rem', // p-2
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow
        top: (refresthing ? REFRESH_THRESHOLD : pullPosition) / 3,
        opacity: refresthing || pullPosition > 0 ? 1 : 0,
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
      />
    </div>

    {/* <ReactPullToRefresh onRefresh={handleRefresh} > */}
    {/* <Box w="100%" h="100%" bg="green.200" /> */}
    {/*  */}



    {refresh_token !== '' && (
      <>
        {Object.keys(data).length === 0 && <Loading />}
        {Object.keys(data).length !== 0 && <FullRender />}
      </>
    )}
    {refresh_token === '' && <Login />}
    {/* </ReactPullToRefresh > */}
  </>

};

export default Home;
