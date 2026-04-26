import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { worksData } from '../data/worksData';
import './WorkDetail.css';

interface Review {
  id: number;
  rating: number;
  content: string;
  created_at: string;
}

interface ReviewStats {
  avgRating: string;
  totalCount: number;
  reviewCount: number;
}

function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const work = worksData.find(w => w.id === id);
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const fetchReviews = async () => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/reviews/${id}`);
      if (!response.ok) throw new Error('获取评论失败');
      const data = await response.json();
      setReviews(data.reviews || []);
      setStats(data.stats || null);
    } catch (err) {
      console.error(err);
      setError('获取评论失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || rating === 0 || !content.trim()) {
      setError('请选择评分并填写评论');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId: id, rating, content: content.trim() })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '提交评论失败');
      }
      setRating(0);
      setContent('');
      await fetchReviews();
    } catch (err: any) {
      console.error(err);
      setError(err.message || '提交评论失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExperience = () => {
    window.open(work.workUrl, '_blank', 'noopener,noreferrer');
  };

  const handleBack = () => {
    navigate('/works');
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= currentRating ? 'active' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN');
  };

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

  return (
    <div className="work-detail-page">
      <div className="work-detail-container">
        <button onClick={handleBack} className="btn-back btn-small">
          ← 返回作品列表
        </button>

        <div className="work-detail-header">
          <h1 className="work-title">{work.title}</h1>
        </div>

        <div className="work-detail-image-wrapper">
          <img 
            src={work.detailImage} 
            alt={work.title} 
            className="work-detail-image"
            onClick={handleExperience}
            style={{ cursor: 'pointer' }}
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
        </div>

        {/* 评论和评分部分 */}
        <div className="work-detail-content reviews-section">
          <section className="rating-section">
            <h2>评分与评价</h2>
            {stats && (
              <div className="rating-summary">
                <div className="avg-rating">
                  <span className="rating-number">{stats.avgRating}</span>
                  {renderStars(parseFloat(stats.avgRating))}
                  <span className="rating-count">({stats.totalCount}条评价)</span>
                </div>
              </div>
            )}
          </section>

          <section className="review-form-section">
            <h3>发表评论</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>评分：</label>
                {renderStars(rating, true)}
              </div>
              <div className="form-group">
                <label>评论内容：</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="写下你的评论（最多500字）..."
                  maxLength={500}
                  rows={4}
                />
                <span className="char-count">{content.length}/500</span>
              </div>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={submitting || rating === 0 || !content.trim()}
              >
                {submitting ? '提交中...' : '提交评论'}
              </button>
            </form>
          </section>

          <section className="reviews-list-section">
            <h3>评论列表</h3>
            {loading ? (
              <div className="loading">加载中...</div>
            ) : reviews.length === 0 ? (
              <div className="no-reviews">暂无评论，快来抢沙发吧！</div>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      {renderStars(review.rating)}
                      <span className="review-date">{formatDate(review.created_at)}</span>
                    </div>
                    <div className="review-content">{review.content}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default WorkDetail;
