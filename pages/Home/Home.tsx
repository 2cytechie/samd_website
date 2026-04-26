import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="home-content">
        <h1 className="welcome-title">欢迎来到我的作品集</h1>
        <p className="intro-text">
          探索我的创意世界，发现精彩作品
          <br />
          用代码和设计编织梦想
        </p>
        <Link to="/works" className="cta-button">
          查看作品
        </Link>
      </div>
    </div>
  );
}

export default Home;
