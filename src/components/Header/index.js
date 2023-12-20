import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {showSearchBar: false, showMenu: false, inputText: ''}

  onClickSearchIcon = () => {
    this.setState({showSearchBar: true})
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onClickShowMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  onEnterSearchInput = event => {
    const {onSearchInput} = this.props
    const {inputText} = this.state
    if (event.key === 'Enter') {
      onSearchInput(inputText)
    }
  }

  onClickSearch = () => {
    const {onSearchInput} = this.props
    const {inputText} = this.state
    onSearchInput(inputText)
  }

  render() {
    const {showSearchBar, showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassNameStyling
    let popularClassNameStyling
    let accountClassNameStyling

    switch (path) {
      case '/':
        homeClassNameStyling = 'active'
        popularClassNameStyling = ''
        accountClassNameStyling = ''
        break
      case '/popular':
        homeClassNameStyling = ''
        popularClassNameStyling = 'active'
        accountClassNameStyling = ''
        break
      case '/account':
        homeClassNameStyling = ''
        popularClassNameStyling = ''
        accountClassNameStyling = 'active'
        break
      default:
        homeClassNameStyling = ''
        popularClassNameStyling = ''
        accountClassNameStyling = ''
        break
    }

    return (
      <nav className="nav-container">
        <div className="responsive-nav-container">
          <div className="desktop-nav-container">
            <div className="website-logo-and-links">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1701754310/Group_7399_kngyxc.png"
                  alt="website logo"
                  className="website-movie-logo"
                />
              </Link>
              <ul className="nav-list-items">
                <Link to="/" className="nav-link">
                  <li className={`nav-item ${homeClassNameStyling}`}>Home</li>
                </Link>
                <Link to="/popular" className="nav-link">
                  <li className={`nav-item ${popularClassNameStyling}`}>
                    Popular
                  </li>
                </Link>
              </ul>
            </div>
            <div className="search-and-account-container">
              {showSearchBar ? (
                <div className="search-container">
                  <input
                    type="search"
                    onKeyDown={this.onEnterSearchInput}
                    onChange={this.onChangeInput}
                    placeholder="Search"
                    className="search-input"
                  />
                  <button
                    type="button"
                    className="search-button"
                    testid="searchButton"
                    onClick={this.onClickSearch}
                  >
                    <HiOutlineSearch size={20} color="white" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="search-icon"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                >
                  <Link to="/search">
                    <HiOutlineSearch size={20} color="white" />
                  </Link>
                </button>
              )}
              <Link to="/account">
                <img
                  src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1701833178/Avatar_bz4muf.png"
                  alt="profile"
                  className="profile"
                />
              </Link>
            </div>
          </div>
          <div className="mobile-nav-container">
            <div className="website-logo-and-links">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1701754310/Group_7399_kngyxc.png"
                  alt="website logo"
                  className="website-movie-logo"
                />
              </Link>
            </div>
            <div className="search-and-account-container">
              {showSearchBar ? (
                <div className="search-container">
                  <input
                    type="search"
                    onKeyDown={this.onEnterSearchInput}
                    onChange={this.onChangeInput}
                    placeholder="Search"
                    className="mobile-search-input"
                  />
                  <button
                    type="button"
                    className="search-button"
                    testid="searchButton"
                    onClick={this.onClickSearch}
                  >
                    <HiOutlineSearch size={20} color="white" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="search-icon"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                >
                  <Link to="/search">
                    <HiOutlineSearch size={20} color="white" />
                  </Link>
                </button>
              )}
              <div>
                <button
                  type="button"
                  className="menu-icon"
                  onClick={this.onClickShowMenu}
                >
                  <MdMenuOpen size={25} color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {showMenu && (
          <div className="mobile-view">
            <ul className="mini-list">
              <Link to="/" className="nav-link">
                <li className={`nav-item ${homeClassNameStyling}`}>Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`nav-item ${popularClassNameStyling}`}>
                  Popular
                </li>
              </Link>
              <Link to="/account" className="nav-link">
                <li className={`nav-item ${accountClassNameStyling}`}>
                  Account
                </li>
              </Link>
              <button
                type="button"
                onClick={this.onClickShowMenu}
                className="cross-icon"
              >
                <ImCross size={10} color="#000000" className="icon" />
              </button>
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
