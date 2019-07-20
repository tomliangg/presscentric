import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

const Wrapper = styled.div`
  margin-top: 20px;
`

const AccountDetail = ({ account }) => (
  account !== null ? (
    <Wrapper>
      <Paper>
        <Typography variant='h5' component='h6'>
          Account ID: {account.id}
          <br />
          Account Name: {account.name}
        </Typography>
      </Paper>
    </Wrapper>
    
  ) : null
)

export default AccountDetail
