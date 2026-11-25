import { useGetNewsEntriesQuery } from '../api';
import { selector } from '../slice';
import { useAppSelector } from '../store';
import Error from './Error';
import Loading from './Loading';
import NewsItem from './NewsItem';

export default () => {
    const state = useAppSelector(selector);
    const date = state.current;

    const { data, isError, isFetching, isSuccess } = useGetNewsEntriesQuery(date ?? '', {
        pollingInterval: 1000 * 60 * 60,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        skipPollingIfUnfocused: true
    });

    void data;

    if (date === null || (isFetching && !isSuccess)) {
        return <Loading />
    }

    if (isError) {
        return <Error />
    }

    return <div className='accordion' id="accordion-ki-news">
        { data?.map((item) => <NewsItem news={ item } parentId='accordion-ki-news' />) }
    </div>
}
