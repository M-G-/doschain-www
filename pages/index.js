import Link from 'next/link'
import BasicLayout from '../source/components/BasicLayout'
import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../i18n'
import './styles.scss'



class Homepage extends React.Component{



  render(){
    const {t} = this.props

    return(
      <BasicLayout title={t('title')}>
        <Banner t={t}/>
      </BasicLayout>
    );
  }
}

class Banner extends React.Component{
  componentDidMount() {
    // this.draw();
  }
  draw(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.clearRect(45,45,60,60);
    ctx.strokeRect(50,50,50,50);
  }
  render(){
    const {t} = this.props

    return(
      <div className='home-banner'>
        <img src='/static/images/home_banner_ft.jpg' className='ft'/>
        <p className='cd'>
          主网上线倒计时
          <span className='time'>00 : 22 : 00</span>
        </p>
        <div className='bt'>
          <a href='/'>已发放DOS</a>
          <a href='/'>已销毁DOS</a>
        </div>
        {/*<canvas id="myCanvas" width="400" height="200"/>*/}
      </div>
    );
  }
}


export default withTranslation('index')(Homepage)