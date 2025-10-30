import './Collections.css'
import NavBar from './NavBar.jsx'

const categories = [
  { title: 'New & Notable', img: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=800&auto=format&fit=crop' },
  { title: 'Top Charts', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop' },
  { title: 'Exclusive', img: 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=800&auto=format&fit=crop' },
  { title: 'Under $50', img: 'https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=800&auto=format&fit=crop' },
  { title: 'Hip-Hop', img: 'https://images.unsplash.com/photo-1541592553160-82008b127ccb?q=80&w=800&auto=format&fit=crop' },
  { title: 'Trap', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop' },
  { title: 'R&B', img: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=800&auto=format&fit=crop' },
]

const chips = ['808', 'trap', 'hip hop', 'rap', 'Hiphop', 'rnb', 'beats', 'drake', 'drill', 'type beat', 'boom bap', 'pop', 'dark']

function Collections() {
  return (
    <div className="col">
      <NavBar />
      <main className="col-main">
        <div className="col-container">
          <div className="col-head">
            <h1>Explore Collections</h1>
            <button className="col-hide">Hide ▴</button>
          </div>

          <div className="col-circles">
            {categories.map((c, i) => (
              <a key={i} href="#" className={`col-circle${i === 1 ? ' is-active' : ''}`}>
                <span className="col-circle__img" style={{ backgroundImage: `url(${c.img})` }} />
                <span className="col-circle__title">{c.title}</span>
              </a>
            ))}
          </div>

          <div className="col-tags">
            <div className="col-search">
              <span className="col-search__icon">🔍</span>
              <input className="col-search__input" placeholder="Search for tags" />
            </div>
            <div className="col-chiprow">
              {chips.map((t) => (
                <a key={t} href="#" className="col-chip">{t}</a>
              ))}
            </div>
          </div>

          <div className="col-filters">
            {['Genre', 'Category', 'Price', 'Mood', 'Instruments'].map((f) => (
              <button key={f} className="col-filter">{f} ▾</button>
            ))}
            <div className="col-cta">
              <button className="col-fav">♡</button>
              <button className="col-layout">▦</button>
              <button className="col-refresh">⟳ Refresh</button>
            </div>
          </div>

          <div className="col-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1541592553160-82008b127ccb?q=80&w=1200&auto=format&fit=crop', title: '100 BEATS FOR $70 (TRAP / HIP-HOP)', by: 'Wendigo', meta: '100 Tracks', price: '$70.00' },
              { img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop', title: 'KANYE BEATS – 70% OFF', by: 'Morgan', meta: '7 Tracks', price: '$149.00' },
              { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop', title: '25 BEATS | Platinum Pack', by: 'Dakota Parker', meta: '25 Tracks', price: '$25.00' },
              { img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop', title: 'THE HIT LIST – VOL. 1', by: 'waytoolost', meta: '97 Tracks', price: '$100.00' },
              { img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop', title: '100 Beats for $75 – Unlimited', by: 'Frugi', meta: '100 Tracks', price: '$75.00' },
            ].map((it, i) => (
              <article key={i} className="col-item">
                <a className="col-thumb" href="#">
                  <img src={it.img} alt={it.title} />
                </a>
                <h3 className="col-item__title">{it.title}</h3>
                <div className="col-item__meta">{it.by} • {it.meta}</div>
                <button className="col-price">{it.price}</button>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Collections


