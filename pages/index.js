import React from 'react'
import 'isomorphic-unfetch'

export default class Index extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:64885/rules')
    const json = await res.json()

    return {
      rules: json.rules
    }
  }

  render () {
    return (
      <div>
        <p>No. of rules: {this.props.rules.length}</p>
      </div>
    )
  }
}
