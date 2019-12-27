import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner';

import MaterialTable from "material-table";

import filesize from 'filesize';



export default function NetworksPage(props){
  
    const [networks, setnetworks] =  React.useState(null)
    const [dataTable, setDataTable] = React.useState(null)
    
    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
  
    useEffect(() => {
      var data = []
      if(networks == null){
        
        (async () => {
          const response = await fetch('http://api.harmony.choisy.io/allnetworks');
          const resultat = await response.json();
          setnetworks(resultat)
          console.log(resultat)
          resultat.forEach( (element,index) => {
            var subnet
            var gateway
            element.IPAM.Config.forEach ((e,i) => {
                subnet = e.Subnet
                gateway = e.Gateway
            })
              
            
           data.push({
              Name: element.Name,
              Driver: element.Driver,
              Scope: element.Scope,
              Attachable: element.Attachable == true ? "true" : "false",
              Internal: element.Internal == true ? "true" : "false",
              IPAMDriver: element.IPAM.Driver,
              IPAMSubnet : subnet,
              IPAMGateway: gateway,
            })
          })
          setDataTable(data)
        })()
      }
    }, [networks]);
  
  if(dataTable == null){
    return (<Grid justify="center" container ><Loader
         type="TailSpin"
         color="#3f51b5"
         height={100}
         width={100}
      /></Grid>)

    return (<Grid justify="center" container ><Loader
         type="TailSpin"
         color="#3f51b5"
         height={100}
         width={100}
      /></Grid>)

  }else{
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "nom", field: "Name" },
            { title: "driver", field: "Driver" },
            { title: "scope", field: "Scope" },
            { title: "attachable", field: "Attachable" },
            { title: "internal", field: "Internal" },
            { title: "IPAM Driver", field: "IPAMDriver" },
            { title: "IPAM Subnet", field: "IPAMSubnet" },
            { title: "IPAM Gateway", field: "IPAMGateway" },
          ]}
          data={dataTable}
          title="Liste des networks"
        />
      </div>
    );
  }
}