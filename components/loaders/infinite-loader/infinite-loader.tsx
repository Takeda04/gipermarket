import React from 'react';
import useElementOnScreen from 'hooks/use-element-on-screen';
const Spinner = React.lazy(() => import('../spinner'));

interface Props {
  hasMore: boolean | undefined;
  loadMore: () => void;
  loading?: boolean;
}

const InfiniteLoader: React.FC<Props> = (props) => {
  const targetRef = useElementOnScreen({
    enabled: !!props.hasMore,
    onScreen: () => {
      props.loadMore();
    },
    rootMargin: '50%',
    threshold: 0.2,
  });

  return (
    <>
      {props.loading ? (
        <Spinner loaderSize={22} loading height={20} />
      ) : (
        props.children
      )}
      <span
        aria-label="bottom"
        ref={targetRef}
        style={{ visibility: 'hidden' }}
      />
    </>
  );
};

InfiniteLoader.defaultProps = {
  loading: false,
};

export default InfiniteLoader;
