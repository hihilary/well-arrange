import * as React from 'react';

import Dropzone from 'react-dropzone'
import * as XLSX from 'xlsx'

import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {IAction} from './interface'
import {fileLoad} from './actions'

import styled from 'styled-components'

const Dropbox = styled.div`
  margin:10px;
`

interface IState {
  file: any,
}

interface IProps {
  which: string,
  onFileLoad: (which: string, file:any)=>void
}

class FileDropZone extends React.Component<IProps, IState> {

  constructor(props :IProps) {
    super(props)
    this.state = {file:undefined, }
  }

  public render() {
    return (
      <Dropbox>
        <Dropzone 
        multiple={false}
        onDrop={this.onDrop} 
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
          <div>
            {this.state.file? `${this.props.which} has been loaded, drop to modify.` :`drop the ${this.props.which}.`}
            {/* Drop the first file. */}
          </div>
        </Dropzone>
        {/* <div>
          <h4>First File:</h4>
          <ul>
            {
              this.state.file?<li>{this.state.file.name}</li>:''
            }
          </ul>
        </div> */}
      </Dropbox>
    );
  }

  private onDrop =(acceptedfiles :any) =>{
    this.setState({file: acceptedfiles[0]})
    // console.log(this.state.file)
    const reader = new FileReader()
    reader.onload = (e :any)=> {
      let data = e.target.result
      // console.log(data)
      // dealing with xlsx
      data = new Uint8Array(data)
      const workbook = XLSX.read(data, {type:'array'})
      // console.log(workbook)
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(firstWorksheet,{header:1})
      // console.log(jsonData)
      this.props.onFileLoad(this.props.which, jsonData)
    }
    reader.readAsArrayBuffer(this.state.file)
  }
}

function mapDispatchToProps(dispatch :Dispatch<IAction>) {
  return {
    onFileLoad: (which: string, file:any) => dispatch(fileLoad(which, file)),
  }
}

export default connect(null, mapDispatchToProps)(FileDropZone);