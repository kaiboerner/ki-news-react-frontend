import backward from '../assets/backward.svg';
import first from '../assets/first.svg';
import forward from '../assets/forward.svg';
import last from '../assets/last.svg';

const onClick = () => {};

export default () => {
    return (
        <nav aria-label="pagination">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" onClick={onClick}>
                        <img src={first} alt="first" />
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" onClick={onClick}>
                        <img src={backward} alt="backward" />
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link" onClick={onClick}>
                        current
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" onClick={onClick}>
                        <img src={forward} alt="forward" />
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" onClick={onClick}>
                        <img src={last} alt="last" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};
