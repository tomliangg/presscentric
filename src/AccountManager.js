import React, { Component } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import AccountDetail from './AccountDetail';
import DeleteSuccess from './DeleteSuccess'
import Spinner from './Spinner'


const Wrapper = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin-top: 20px;
`

const data = require('./accounts.json')
export const URL = 'https://dev.presscentric.com/test/accounts'

export default class AccountManager extends Component {
  state = {
    accounts: null,
    selectedAccount: null,
    deletedAccount: null,
    open: false
  }

  handleChange = selectedAccount => {
    this.setState({ selectedAccount })
  }

  handleDelete = () => {
    const { accounts, selectedAccount } = this.state
    fetch(`${URL}/${selectedAccount.id}`, { method: 'delete' })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    const remainingAccounts = accounts.filter(account => account.id !== selectedAccount.id)
    this.setState(prevState => ({
      accounts: remainingAccounts,
      deletedAccount: prevState.selectedAccount,
      selectedAccount: null,
      open: true
    }))
    setTimeout(() => {
      this.setState({ open: false })
    }, 2000)
  }

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(json => this.setState({ accounts: json }))
      .catch(err => {
        console.log(err)
        this.setState({ accounts: data })
      })
  }

  render() {
    const { accounts, selectedAccount, deletedAccount, open } = this.state
    if (accounts === null) return <Spinner />
    else return (accounts.length ? (
      <Wrapper>
        <Select
          value={selectedAccount}
          onChange={this.handleChange}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.name}
          options={accounts}
          placeholder='select an account to check details'
        />
        <AccountDetail account={selectedAccount} deleteHandler={this.handleDelete} />
        <DeleteSuccess open={open} account={deletedAccount} />
      </Wrapper>
    ) : (
      <p>You have deleted all the accounts</p>
    ))
  }
}
