import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductService from "../services/ProductService";
import ProcService from "../services/ProcService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MultiSelect } from "primereact/multiselect";
import { Link } from "react-router-dom";
export class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryUITable: [],
     
    };

    this.productService = new ProductService();
    this.procService = new ProcService();
  }

  

  componentDidMount() {

    this.procService
      .getCategoryTable({ material: 7001733 })
      .then((data) => {
      console.log("Data in excel===>",data.data)

        return this.setState({
          categoryUITable: data.data,
        });
      });
  }
 
  statusBodyTemplate(rowData) {

    return (

      <Link to="/DemandAndInventoryAnalysis">

        <span style={{ color: "#009FDA" }}>View More </span>

      </Link>

    );

  }

  render() {
    // console.log("state Data  =>", this.state);
    

    return (
      <div>
  

        <div className="card">
          <h4 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Buyer Group-03J Overview Across Plants(Consolidated)</h4>

          {/* <h4 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Inventory Analysis</h4> */}
          <DataTable 
            value={this.state.categoryUITable}
            paginator
            rows={5}
            rowsPerPageOptions={[10, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column field="material" header="Material Number" />
            <Column field="alert_category" header="Alert Category" />
            <Column field="ROP" header="ROP" />
            <Column
              field="avg_consumption"
              header="Average Anual consumption"
            />
            <Column field="conslidated_demand" header="Potential Consumption" />
            <Column field="material_type" header="Material Type" />
             <Column field="base_unit_of_measure" header="UOM" />
             <Column field="open_pr_quantity" header="PR Qty" />
             <Column field="onroute_quantity" header="On Route Qty" />
             <Column field="demand_period" header="Forcasted Period" />
             <Column header="Action" body={this.statusBodyTemplate}></Column>
          </DataTable>
        </div>

        {/* <div className="card">
          <h4 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Demand Prediction for next 6 months across all plants</h4>
          <DataTable
            value={this.state.demandUITable}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column field="plant" header="Plant" />
            <Column
              field="avg_total_consumption"
              header="Avg Annual Consumption"
            />
            <Column field="5/1/21" header={`${month1}`} />
            <Column field="6/1/21" header={`${month2}`} />
            <Column field="7/1/21" header={`${month3}`} />
            <Column field="8/1/21" header={`${month4}`} />
            <Column field="9/1/21" header={`${month5}`} />
            <Column field="10/1/21" header={`${month6}`} />
            <Column field="prediction_error" header="Prediction Accuracy" />
          </DataTable>
        </div> */}

        {/* <div className="card">
          <div>
            <div>
              <MultiSelect
                style={{ width: "99.9%" }}
                value={this.state.plants}
                options={this.plants}
                onChange={(e) => this.onPlantChange(e)}
                optionLabel="label"
                placeholder="Select a Plant"
                display="chip"
              />
            </div>
          </div>

          <div style={{ width: "99%" }}>
            <HighchartsReact highcharts={Highcharts} options={chart3} />
          </div>
        </div> */}
      </div>
    );
  }
}
