import { type NewsEntry } from '../types';

export default ({ news, parentId }: { news: NewsEntry; parentId: string }) => {
    void news;
    void parentId;

    const id = 'ki-news-' + news.id;
    const contentId = id + '-content';
    const url = new URL(news.url);
    const domain = url.host;

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button"
                    data-bs-target={'#' + id}
                    data-bs-toggle="collapse"
                    type="button"
                >
                    {news.headline}
                </button>
            </h2>
            <div
                id={id}
                className="accordion-collapse collapse collapsed"
                data-bs-parent={'#' + parentId}
            >
                <div className="accordion-body">
                    <small>
                        Quelle:{' '}
                        <a href={news.url} target="_blank">
                            {domain}
                        </a>
                    </small>
                </div>
                <div className="accordion-body">
                    {news.summary}
                    <a href={'#' + contentId} data-bs-toggle="collapse" role="button">
                        mehr &hellip;
                    </a>
                </div>
                <div className="collapse" id={contentId}>
                    <div className="accordion-body">{news.content}</div>
                </div>
            </div>
        </div>
    );
};
