import * as React from 'react';
import './App.css';
import FileDropZone from './FileDropZone';
import {connect} from 'react-redux'
import {IStoreState} from './interface'

import * as XLSX from 'xlsx'

interface IProps{
  file1: any,
  file2: any,
  file3: any,
  file4: any,
}

class App extends React.Component<IProps, any> {

  constructor(props :IProps) {
    super(props)
  }
  public render() {
    return (
      <div className="App">
      <FileDropZone which="file1"/>
      <FileDropZone which="file2"/>
      <FileDropZone which="file3"/>
      <FileDropZone which="file4"/>
      <button onClick={this.startArrange}>Start</button>
      </div>
    );
  }

  private startArrange = () => {
    // console.log(this.state)
    const file1 = this.props.file1
    const file2 = this.props.file2
    const file3 = this.props.file3
    const file4 = this.props.file4
    if (file1!=='' && file2!=='' && file3 !== '' && file4 !== '') {
      const ret = this.arrange(file1, file2, file3, file4)
      console.log(ret)
      const worksheet = XLSX.utils.aoa_to_sheet(ret);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, worksheet, "sheet1");
      XLSX.writeFile(newWorkbook, 'new.xlsx');
    } else {
      alert('not enough files')
    }
  }

  private arrange = (file1:[], file2:[], file3:[], file4:[]) :any[] => {
    // console.log(file1, file2, file3, file4)
    const arranged:any[] = []
    arranged.push(file1[0])
    for (let i = 0; i < 8; ++i) {
      // line of odd number
      for (let j = 1; j <= 12; ++j) {
        arranged.push(file1[12*i + j])
        arranged.push(file2[12*i + j])
      }
      // line of even number
      for (let j = 1; j <= 12; ++j) {
        arranged.push(file3[12*i + j])
        arranged.push(file4[12*i + j])
      }
    }
    return arranged
  }
}

function mapStateToProps(state :IStoreState) {
  // console.log(state)
  return {
    file1: state.file1,
    file2: state.file2,
    file3: state.file3,
    file4: state.file4,
  }
}

export default connect(mapStateToProps, null)(App);
