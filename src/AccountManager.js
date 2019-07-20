import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import Spinner from './Spinner'
import AccountDetail from './AccountDetail';

const data = require('./data.json')
const SERVER = 'https://dev.presscentric.com/test'

export default class AccountManager extends Component {
  state = {
    accounts: null,
    selectedAccount: null
  }

  handleChange = selectedAccount => {
    this.setState({ selectedAccount })
  }

  componentDidMount() {
    fetch(SERVER + '/accounts')
      .then(res => res.json())
      .then(json => this.setState({ accounts: json }))
      .catch(err => {
        console.log(err)
        this.setState({ accounts: data})
      })
  }

  render() {
    const { accounts, selectedAccount } = this.state
    if (accounts === null) return <Spinner />
    else return (accounts.length ? (
      <Fragment>
        <Select
          value={selectedAccount}
          onChange={this.handleChange}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.name}
          options={accounts}
          placeholder='select an account'
        />
        <AccountDetail account={selectedAccount} />
      </Fragment>
    ) : (
      <p>You have deleted all the accounts</p>
    ))
  }
}
