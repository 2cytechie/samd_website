import './Works.css';
import { Link } from 'react-router-dom';
import { worksData } from '../data/worksData';

function Works() {
  return (
    <div className="works-container">
      <div className="works-content">
        <h1 className="works-title">我的作品</h1>
        <div className="works-grid">
          {worksData.map((work) => (
            <div key={work.id} className="work-card">
              <Link to={`/works/${work.id}`}>
                <img src={work.thumbnail} alt={work.title} className="work-thumbnail" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Works;
