const onClick = () => { };

export default () => {
    return (
        <nav aria-label="pagination">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" onClick={ onClick }>
                        <img src="/icons/first.svg" alt="first" />
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" onClick={ onClick }>
                        <img src="/icons/backward.svg" alt="backward" />
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link" onClick={ onClick }>
                        current
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" onClick={ onClick }>
                        <img src="/icons/forward.svg" alt="forward" />
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" onClick={ onClick }>
                        <img src="/icons/last.svg" alt="last" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};
