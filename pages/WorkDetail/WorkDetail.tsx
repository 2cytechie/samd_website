import { useParams, Link, useNavigate } from 'react-router-dom';
import { worksData } from '../data/worksData';
import './WorkDetail.css';

function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const work = worksData.find(w => w.id === id);

  if (!work) {
    return (
      <div className="work-detail-page">
        <div className="work-detail-container not-found">
          <h1>作品未找到</h1>
          <Link to="/works" className="btn-back">
            返回作品列表
          </Link>
        </div>
      </div>
    );
  }

  const handleExperience = () => {
    window.open(work.workUrl, '_blank', 'noopener,noreferrer');
  };

  const handleBack = () => {
    navigate('/works');
  };

  return (
    <div className="work-detail-page">
      <div className="work-detail-container">
        <button onClick={handleBack} className="btn-back btn-small">
          ← 返回作品列表
        </button>

        <div className="work-detail-header">
          <span className="work-type-badge">{work.type}</span>
          <h1 className="work-title">{work.title}</h1>
        </div>

        <div className="work-detail-image-wrapper">
          <img 
            src={work.detailImage} 
            alt={work.title} 
            className="work-detail-image"
          />
        </div>

        <div className="work-detail-content">
          <section className="work-description-section">
            <h2>作品简介</h2>
            <p className="work-description">{work.description}</p>
          </section>

          <section className="work-tags-section">
            <h2>技术标签</h2>
            <div className="work-tags">
              {work.tags.map((tag, index) => (
                <span key={index} className="work-tag">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="work-actions">
            <button onClick={handleExperience} className="btn-experience">
              <span className="btn-icon">🚀</span>
              体验作品
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkDetail;
