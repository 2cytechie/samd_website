import './Works.css';
import { worksData } from '../data/worksData';

function Works() {
  return (
    <div className="works-container">
      <div className="works-content">
        <h1 className="works-title">我的作品</h1>
        <p className="works-subtitle">精彩即将呈现...</p>
        <div className="works-grid">
          {worksData.map((work) => (
            <div key={work.id} className="work-card">
              <a href={work.workUrl} target="_blank" rel="noopener noreferrer">
                <img src={work.thumbnail} alt={work.title} className="work-thumbnail" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Works;
