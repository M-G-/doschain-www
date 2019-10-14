import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from '../../i18n'
import './index.scss'

class Footer extends React.Component {
  render() {
    return (
      <footer className='c-footer center-block'>
        <p>copyright @ DOSChain 2019</p>
      </footer>
    )
  }
}

Footer.getInitialProps = async () => ({
  namespacesRequired: ['footer'],
})

Footer.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('footer')(Footer)