import './NavBar.css'
import { useEffect, useRef, useState } from 'react'
import { IconApps, IconSearch, IconMusic, IconRecord, IconWave, IconUser, IconRobot, IconChevronDown, IconCart } from './icons.jsx'

function NavBar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Tracks')
  const filterRef = useRef(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const filterItems = [
    'All',
    'Tracks',
    'Musicians',
    'Playlists',
    'Collections',
    'AI Models',
    'Sound Kits',
    'Services',
  ]

  useEffect(() => {
    function onDocClick(e) {
      if (!filterRef.current) return
      if (!filterRef.current.contains(e.target)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4)
    }
    function onResize() {
      if (window.innerWidth > 900) setIsMobileOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <header className={`bs-nav${scrolled ? ' bs-nav--scrolled' : ''}`}>
      <div className="bs-nav__inner">
        <div className="bs-row bs-row--top">
          <div className="bs-nav__left">
            <button
              className="bs-nav__apps"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((v) => !v)}
            >
              <IconApps />
            </button>
        <a href="#/" className="bs-nav__brand">
          <span className="bs-logo">B</span>
          <span className="bs-brand-text">BEATSTARS</span>
        </a>
        <nav className="bs-nav__links">
               <a href="#" className="bs-link">Feed</a>
        </nav>
          </div>

          <div className="bs-nav__center">
            <div className="bs-search">
              <span className="bs-icon bs-search__icon"><IconSearch /></span>
              <input
                className="bs-search__input"
                placeholder="Try searching Trap or Sad or Juice Wrld..."
                aria-label="Search"
              />
              <div className="bs-filter" ref={filterRef}>
                <button
                  className="bs-search__filter"
                  aria-expanded={isFilterOpen}
                  aria-haspopup="listbox"
                  onClick={() => setIsFilterOpen((v) => !v)}
                >
                  {activeFilter} <IconChevronDown />
                </button>
                {isFilterOpen && (
                  <ul className="bs-menu" role="listbox" aria-label="Search category">
                    {filterItems.map((item) => (
                      <li key={item}>
                        <button
                          className={`bs-menu__item${activeFilter === item ? ' is-active' : ''}`}
                          role="option"
                          aria-selected={activeFilter === item}
                          onClick={() => {
                            setActiveFilter(item)
                            setIsFilterOpen(false)
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="bs-nav__right">
            <a href="#/signup" className="bs-auth" onClick={(e) => { e.preventDefault(); window.location.hash = '/signup' }}>Sign up</a>
            <span className="bs-divider" aria-hidden="true">|</span>
            <a href="#/login" className="bs-auth" onClick={(e) => { e.preventDefault(); window.location.hash = '/login' }}>Sign in</a>
            <a href="#" className="bs-cta">Start Selling <span className="bs-rocket">🚀</span></a>
            <button className="bs-icon-btn" aria-label="Cart"><IconCart /></button>
            <button className="bs-icon-btn" aria-label="More"><IconChevronDown /></button>
          </div>
        </div>

        <div className="bs-row bs-row--sub">
          <div className="bs-subnav">
            <a className="bs-subnav__link" href="#/tracks"><IconMusic /> Tracks</a>
            <a className="bs-subnav__link" href="#/collections"><IconRecord /> Collections</a>
            <a className="bs-subnav__link" href="#/soundkits"><IconWave /> Sound Kits</a>
            <a className="bs-subnav__link" href="#/musicians"><IconUser /> Musicians</a>
            <a className="bs-subnav__link" href="#/aimodels"><IconRobot /> AI Models</a>
          </div>
        </div>
      </div>
      {isMobileOpen && (
        <div className="bs-mobile" id="mobile-menu" role="dialog" aria-modal="true">
          <div className="bs-mobile__overlay" onClick={() => setIsMobileOpen(false)} />
          <nav className="bs-mobile__panel">
            <a className="bs-mobile__brand" href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '/'; setIsMobileOpen(false) }}>BEATSTARS</a>
            <a className="bs-mobile__link" href="#/tracks" onClick={(e) => { e.preventDefault(); window.location.hash = '/tracks'; setIsMobileOpen(false) }}>Tracks</a>
            <a className="bs-mobile__link" href="#/collections" onClick={(e) => { e.preventDefault(); window.location.hash = '/collections'; setIsMobileOpen(false) }}>Collections</a>
            <a className="bs-mobile__link" href="#/soundkits" onClick={(e) => { e.preventDefault(); window.location.hash = '/soundkits'; setIsMobileOpen(false) }}>Sound Kits</a>
            <a className="bs-mobile__link" href="#/musicians" onClick={(e) => { e.preventDefault(); window.location.hash = '/musicians'; setIsMobileOpen(false) }}>Musicians</a>
            <a className="bs-mobile__link" href="#/aimodels" onClick={(e) => { e.preventDefault(); window.location.hash = '/aimodels'; setIsMobileOpen(false) }}>AI Models</a>
            <div className="bs-mobile__auth">
              <a href="#/signup" className="bs-auth" onClick={(e) => { e.preventDefault(); window.location.hash = '/signup'; setIsMobileOpen(false) }}>Sign up</a>
              <a href="#/login" className="bs-auth" onClick={(e) => { e.preventDefault(); window.location.hash = '/login'; setIsMobileOpen(false) }}>Sign in</a>
              <a href="#" className="bs-cta">Start Selling <span className="bs-rocket">🚀</span></a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default NavBar


