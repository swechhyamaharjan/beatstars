import './LandingPage.css'
import NavBar from './NavBar.jsx'

function LandingPage() {
  return (
    <div className="lp">
      <NavBar />
      <section className="lp-hero lp-hero--split">
        <div className="lp-container lp-hero__inner">
          <div className="lp-hero__left">
            <h1 className="lp-h1">Your first hit starts here</h1>
            <p className="lp-lead">Search millions of tracks, sound kits, and services from creators worldwide.</p>
            <form className="lp-search" onSubmit={(e) => e.preventDefault()}>
              <input className="lp-search__input" placeholder='Try "Trap" or "Juice Wrld"' aria-label="Search" />
              <button className="lp-search__btn">Search</button>
            </form>
            <div className="lp-quick">
              <span>Popular:</span>
              {['Drill', 'R&B', 'Afrobeats', 'Hyperpop'].map((t) => (
                <a key={t} href="#" className="lp-chip">{t}</a>
              ))}
            </div>
          </div>
          <div className="lp-hero__right">
            <div className="lp-hero__card">
              <img src="https://images.unsplash.com/photo-1541592553160-82008b127ccb?q=80&w=1200&auto=format&fit=crop" alt="featured" />
              <div className="lp-hero__badge">Featured</div>
              <div className="lp-hero__caption">
                <div className="lp-hero__track">SUNDAY MORNING</div>
                <div className="lp-hero__artist">DARIUSH</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-highlights">
        <div className="lp-container">
          <div className="lp-grid">
            <div className="lp-card">
              <h3>Trending Tracks</h3>
              <p>Hand-picked instrumentals rising on the charts today.</p>
            </div>
            <div className="lp-card">
              <h3>Sound Kits</h3>
              <p>Drum kits, one-shots, and MIDI packs for instant inspiration.</p>
            </div>
            <div className="lp-card">
              <h3>Hire Musicians</h3>
              <p>Work with vocalists, composers, and engineers to finish faster.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-trending">
        <div className="lp-container">
          <div className="lp-trending__head">
            <h2>Trending tracks</h2>
            <a className="lp-see-more" href="#">See more</a>
          </div>
          <div className="lp-trending__grid lp-snap">
            {[
              { img: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800&auto=format&fit=crop', title: 'LEAN', by: 'Diamond Style', price: '$17.95' },
              { img: 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=800&auto=format&fit=crop', title: 'MIDNIGHT DRIVE', by: 'Diamond Style', price: '$17.95' },
              { img: 'https://images.unsplash.com/photo-1541592553160-82008b127ccb?q=80&w=800&auto=format&fit=crop', title: 'GLITCH MASK', by: 'Beast Inside Beats', price: '$17.00' },
              { img: 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=800&auto=format&fit=crop', title: 'RED RUM', by: 'Gotenkeys', price: '$39.99' },
              { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', title: 'PLATINUM PACK', by: 'Dakota Parker', price: '$25.00' },
              { img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', title: 'FANCY', by: 'CODE.441', price: '$9.99' },
            ].map((card, idx) => (
              <article className="lp-track lp-snap__item" key={idx}>
                <div className="lp-track__art">
                  <img src={card.img} alt="cover" />
                </div>
                <div className="lp-track__meta">
                  <h4 className="lp-track__title">{card.title}</h4>
                  <div className="lp-track__by">{card.by}</div>
                </div>
                <button className="lp-track__price">{card.price}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-genres">
        <div className="lp-container">
          <div className="lp-genres__head">
            <h2>Popular Genres</h2>
            <a className="lp-see-more" href="#">See more</a>
          </div>
          <div className="lp-genres__grid">
            {[
              { title: 'Hip Hop', img: 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=900&auto=format&fit=crop' },
              { title: 'Pop', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=900&auto=format&fit=crop' },
              { title: 'R&B', img: 'https://images.unsplash.com/photo-1519455953755-af066f52f1ea?q=80&w=900&auto=format&fit=crop' },
              { title: 'Rock', img: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81a?q=80&w=900&auto=format&fit=crop' },
              { title: 'Electronic', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop' },
              { title: 'Reggae', img: 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=900&auto=format&fit=crop' },
            ].map((g, i) => (
              <article key={i} className="lp-genre">
                <div className="lp-genre__art">
                  <img src={g.img} alt={g.title} />
                  <div className="lp-genre__label">{g.title}</div>
                </div>
                <div className="lp-genre__name">{g.title}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-spotlight">
        <div className="lp-container">
          <div className="lp-spotlight__head">
            <h2>Creator spotlight</h2>
          </div>
          <div className="lp-spotlight__row">
            {[
              { name: 'DARIUSH', role: 'Producer', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500&auto=format&fit=crop' },
              { name: 'NOVA', role: 'Vocalist', img: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?q=80&w=500&auto=format&fit=crop' },
              { name: 'HOLLOW', role: 'Engineer', img: 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=500&auto=format&fit=crop' },
              { name: 'LENA', role: 'Composer', img: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=500&auto=format&fit=crop' },
            ].map((u, i) => (
              <div className="lp-creator" key={i}>
                <img className="lp-creator__avatar" src={u.img} alt={u.name} />
                <div className="lp-creator__name">{u.name}</div>
                <div className="lp-creator__role">{u.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-news">
        <div className="lp-container lp-news__inner">
          <div className="lp-news__copy">
            <h3>Get exclusive drops in your inbox</h3>
            <p>Subscribe for new releases, free packs, and creator spotlights.</p>
          </div>
          <form className="lp-news__form" onSubmit={(e) => e.preventDefault()}>
            <input className="lp-news__input" placeholder="Enter your email" aria-label="Email" />
            <button className="lp-news__button">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default LandingPage


