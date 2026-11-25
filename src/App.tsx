import NewsItems from './components/NewsItems';
import Pagination from './components/Pagination';

export default () => {
    return (
        <div className="container">
            <h1>KI News</h1>
            <div className="card">
                <div className="card-header">
                    <Pagination />
                </div>
                <div className="card-body">
                    <NewsItems />
                </div>
                <div className="card-footer">
                    <Pagination />
                </div>
            </div>
        </div>
    );
};
