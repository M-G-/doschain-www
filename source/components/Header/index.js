import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { i18n, withTranslation } from '../../../i18n'
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
            <Link href='/'>
              <a className='logo' >
                <img src='/static/images/logo.png' alt='DOSChain' />
              </a>
            </Link>

            {/*<Link href='/'><a>{t('nav-home')}</a></Link>*/}
            <Link href='/'><a>DAPP</a></Link>
            <Link href='/'><a>钱包</a></Link>
            <Link href='/'><a>提案系统</a></Link>
            <Link href='/'><a>投票服务商</a></Link>
            <Link href='/'><a>区块浏览器</a></Link>
            <Link href='/'><a>文档</a></Link>
            <Link href='/'><a>社区</a></Link>
            <Link href='/'><a>线路图</a></Link>
            <Link href='/'><a>新闻</a></Link>
          </nav>
          <div className='c-header-right'>
            {/*<ul className='change-language'>
              <li
                className='active'
                onClick={()=>{Header.changeLanguage('zh')}}
              >中文</li>
              <li>&nbsp;/&nbsp;</li>
              <li
                className='active'
                onClick={()=>{Header.changeLanguage('en')}}
              >English</li>
            </ul>*/}
            <a href='/'>注册</a>
            <a href='/'>登录</a>
            <span>|</span>
            <select value='zh' onChange={()=>{}}>
              <option value='zh'>中文</option>
              <option value='en'>英文</option>
            </select>
          </div>

        </div>

      </header>
    )
  }
}

export default withTranslation('common')(Header)