import Link from 'next/link'
import BasicLayout from '../components/BasicLayout'
import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../i18n'
import axios from '../utils/axios'
class Homepage extends React.Component{

  static async getInitialProps () {
    const {data} = await axios.get('https://blockchain.info/ticker')

    return {
      namespacesRequired: ['common'],
      aData: data
    }
  }

  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  render(){
    const {aData, t} = this.props
    return(
      <BasicLayout title={t('h1')}>
        <p className="example" onClick={()=>{alert(0)}}>{t('h1')}</p>
        <p style={{'marginTop': 20}}>BTC价格: ${aData.USD.last} / ¥{aData.CNY.last}</p>
      </BasicLayout>
    );
  }
}

export default withTranslation('index')(Homepage)