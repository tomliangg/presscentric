import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`

const DeleteSuccess = ({ open, account }) => (
  <Snackbar
    open={open}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  >
    <SnackbarContent
      style={{ backgroundColor: 'limegreen' }}
      message={(
        <Wrapper>
          <CheckCircleIcon style={{ marginRight: '8px' }} />
          <p>{account && `${account.name} has been deleted`}</p>
        </Wrapper>
      )}
    />
  </Snackbar>
)

export default DeleteSuccess

DeleteSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  account: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
}

DeleteSuccess.defaultProps = { account: null }
