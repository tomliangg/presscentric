import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Spinner from './Spinner'
import { URL } from './AccountManager'


const data = require('./details.json')

const Wrapper = styled.div`
  margin-top: 20px;
  line-height: 1.6;
`

const BtnWrapper = styled.div`
  text-align: right;
`

export default class AccountDetail extends Component {
  state = {
    detail: null
  }

  componentDidUpdate(prevProps) {
    const oldAccount = prevProps.account
    const newAccount = this.props.account
    if (newAccount && oldAccount !== newAccount) {
      console.log('boom')
      fetch(`${URL}/${newAccount.id}`)
        .then(res => res.json())
        .then(detail => this.setState({ detail }))
        .catch(err => {
          console.log(err)
          const detail = data.filter(d => d.id === newAccount.id)[0]
          console.log(detail)
          this.setState({ detail })
        })
    }
  }

  render() {
    const { account, deleteHandler } = this.props
    const { detail } = this.state

    if (account === null) return null
    return (detail !== null) ? (
      <Wrapper>
        <Paper style={{ padding: '10px' }}>
          <Typography variant='h5'>
            Account Details
          </Typography>
          {Object.keys(detail).map(prop => (
            <Typography variant='body2' key={prop}>
              {prop}: {detail[prop]}
              <br />
            </Typography>
          ))}
          <BtnWrapper>
            <Button
              variant='contained'
              color='secondary'
              onClick={deleteHandler}
              >
                Delete
                <DeleteIcon />
            </Button>
          </BtnWrapper>
        </Paper>
      </Wrapper>
    ) : (
      <Spinner />
    )
  }
  
}
