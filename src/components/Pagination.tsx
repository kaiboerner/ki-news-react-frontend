import { useGetDatesQuery } from '../api';
import { first, last, next, previous, selector, setDates } from '../slice';
import { useAppDispatch, useAppSelector } from '../store';
import { dateFormat, equals } from '../util';
import Error from './Error';
import Loading from './Loading';

export default () => {
    const { data, isError, isFetching, isSuccess } = useGetDatesQuery(null, {
        pollingInterval: 1000 * 60 * 60,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        skipPollingIfUnfocused: true
    });
    const dispatch = useAppDispatch();
    const state = useAppSelector(selector);

    if (isError) {
        return <Error />;
    }

    if (isFetching && !isSuccess) {
        return <Loading />;
    }

    if (!equals(state.dates, data)) {
        dispatch(setDates(data ?? []));
    }

    const index = state.index;
    const length = state.dates.length;

    const btnFirst =
        index !== null && index > 1 ? (
            <li className="page-item">
                <a
                    className="page-link"
                    onClick={ () => {
                        dispatch(first());
                    } }
                >
                    <img src="/assets/icons/first.svg" alt="first" />
                </a>
            </li>
        ) : (
            ''
        );

    const btnPrev =
        index !== null && index > 0 ? (
            <li className="page-item">
                <a
                    className="page-link"
                    onClick={ () => {
                        dispatch(previous());
                    } }
                >
                    <img src="/assets/icons/backward.svg" alt="backward" />
                </a>
            </li>
        ) : (
            ''
        );

    const currentDate = state.current ? dateFormat(state.current) : '';
    const current = <li className="page-item disabled">{ currentDate }</li>;

    const btnNext =
        index !== null && index < length - 1 ? (
            <li className="page-item">
                <a
                    className="page-link"
                    onClick={ () => {
                        dispatch(next());
                    } }
                >
                    <img src="/assets/icons/forward.svg" alt="forward" />
                </a>
            </li>
        ) : (
            ''
        );

    const btnLast =
        index !== null && index < length - 2 ? (
            <li className="page-item">
                <a
                    className="page-link"
                    onClick={ () => {
                        dispatch(last());
                    } }
                >
                    <img src="/assets/icons/last.svg" alt="last" />
                </a>
            </li>
        ) : (
            ''
        );

    return (
        <nav aria-label="pagination">
            <ul className="pagination">
                { btnFirst }
                { btnPrev }
                { current }
                { btnNext }
                { btnLast }
            </ul>
        </nav>
    );
};
