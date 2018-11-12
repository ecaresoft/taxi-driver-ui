import React from 'react'
import 'isomorphic-unfetch'
import NoSSR from 'react-no-ssr';
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      country: "mx",
      taxType: "IVA",
      result: "16%"
    }

    this.handleChange = this.handleChange.bind(this)
  }

  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:64885/rules')
    const json = await res.json()

    return {
      rules: json.rules
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if(target.type === 'checkbox') {
      value = target.checked;
    } else if(target.type === 'number') {
      value = parseFloat(target.value);
    }

    this.setState({
      [name]: value
    }, () => this.updateSalesTax());

    console.log(this.state)
  }

  updateSalesTax() {
    fetch('http://localhost:64885/getSalesTax', {
      method: 'POST',
      body: JSON.stringify({
        country: this.state.country,
        query: {
          taxType: this.state.taxType,
          bpTaxType: this.state.bpTaxType,
          category: this.state.category,
          area: this.state.area,
          vars: {
            subTotal: this.state.subTotal
          }
        }
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      console.log('Success:', JSON.stringify(response))
      if(!response.error) {
        this.setState(state => ({ result: (response.result * 100)+'%' }));
      } else {
        this.setState(state => ({ result: response.error }));
      }
    })
  }

  render () {
    return (
      <div>
        <h1>Taxi Driver UI</h1>

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

        <h3>Try it out!</h3>

        <form>
          <label>
            Country:
            <select type="text" name="country" value={this.state.country} onChange={this.handleChange}>
              <option selected value="mx">Mexico</option>
              <option value="sa">Saudi Arabia</option>
              <option value="ar">Argentina</option>
            </select>
          </label>
          <label>
            Tax Type:
            <select type="text" name="taxType" value={this.state.taxType} onChange={this.handleChange}>
              <option selected value="IVA">IVA</option>
              <option value="VAT">VAT</option>
              <option value="RET_IVA">RET_IVA</option>
              <option value="RET_ISR">RET_ISR</option>
            </select>
          </label>
          <label>
            BP Type:
            <select type="text" name="bpTaxType" value={this.state.bpTaxType} onChange={this.handleChange}>
              <option selected></option>
              <option value="TAXYES">TAXYES</option>
              <option value="!TAXYES">!TAXYES</option>
              <option value="INSCRIPTO">INSCRIPTO</option>
              <option value="NO_INSCRIPTO">NO_INSCRIPTO</option>
            </select>
          </label>
          <label>
            Category:
            <select type="text" name="category" value={this.state.category} onChange={this.handleChange}>
              <option selected></option>
              <option value="DRUG">DRUG</option>
              <option value="!DRUG">!DRUG</option>
              <option value="ALQUILERES_RURAL">ALQUILERES_RURAL</option>
            </select>
          </label>
          <label>
            Area:
            <select type="text" name="area" value={this.state.area} onChange={this.handleChange}>
              <option selected></option>
              <option value="PHARMACY">PHARMACY</option>
            </select>
          </label>

          <br />
          Variables:
          <br />

          <label>
            SubTotal:
            <input type="number" name="subTotal" value={this.state.subTotal} onChange={this.handleChange} />
          </label>
        </form>

        <h1>{this.state.result}</h1>
      </div>
    )
  }
}
