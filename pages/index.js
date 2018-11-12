import React from 'react'
import 'isomorphic-unfetch'
import NoSSR from 'react-no-ssr';
import ReactTable from "react-table";
import "react-table/react-table.css";

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
        <h3>Tax Rules</h3>
        <ReactTable
          data={this.props.rules}
          defaultPageSize={10}
          className="-striped -highlight"
          columns={[{
              Header: 'Country Code',
              accessor: 'countryCode'
            },{
              Header: 'Tax Type',
              accessor: 'taxType'
            },{
              Header: 'BP Type',
              accessor: 'bpTaxType'
            },{
              Header: 'Category',
              accessor: 'category'
            },{
              Header: 'Area',
              accessor: 'area'
            },{
              Header: 'Formula',
              accessor: 'formula'
          }]}
        />
      </div>
    )
  }
}
