import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Head from 'next/head'
import '../../styles/common.scss'
import './index.scss'

export default class BasicLayout extends React.Component{

  render(){
    const {title = ''} = this.props;
    return (
      <div className='c-basicLayout'>
        <Head>
          <title>{(title === '' ? '' : `${title} - `) + 'DOSChain'}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {/*<link rel='stylesheet' href='/_next/static/style.css' />*/}
        </Head>
        <div className='c-basicLayout-top'>
          <Header />
          <div className='c-basicLayout-content center-block'>
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}