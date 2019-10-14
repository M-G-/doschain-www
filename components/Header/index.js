import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { i18n, withTranslation } from '../../i18n'
import './styles.scss'

class Header extends React.Component{

  static getInitialProps = async () => ({
    namespacesRequired: ['common'],
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  static changeLanguage (tag){
    i18n.changeLanguage(tag);
  }

  render(){
    const {t} = this.props;
    return(
      <header className='c-header'>
        <div className='center-block'>
          <nav>
            <div className='logo'>
              <img src='/static/images/logo.png' alt='DOSChain' />
            </div>

            <Link href='/'><a>{t('nav-home')}</a></Link>
            <Link href='/about'><a>{t('nav-about')}</a></Link>
          </nav>
          <ul className='change-language'>
            <li
              className='active'
              onClick={()=>{Header.changeLanguage('zh')}}
            >中文</li>
            <li>&nbsp;/&nbsp;</li>
            <li
              className='active'
              onClick={()=>{Header.changeLanguage('en')}}
            >English</li>
          </ul>
        </div>

      </header>
    )
  }
}

export default withTranslation('common')(Header)