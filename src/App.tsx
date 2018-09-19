import * as React from 'react';
import './App.css';
import FileDropZone from './FileDropZone';
import {connect} from 'react-redux'
import {IStoreState} from './interface'

import * as XLSX from 'xlsx'

import styled from 'styled-components'

const Outer = styled.div`
  margin:10px auto;
  width:550px;
`

const CheckedContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
`

const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
`

const Button = styled.button`
  width: 100px;
  height: 30px;
  font-size:20px;
  font-family:Arial;
`

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
      <Outer>
        <CheckedContainer>
          <FileDropZone which="file1"/>
          <FileDropZone which="file2"/>
          <FileDropZone which="file3"/>
          <FileDropZone which="file4"/>
        </CheckedContainer>
          <ButtonContainer>
            <Button onClick={this.startArrange}>Start</Button>
          </ButtonContainer>
      </Outer>
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

  private arrange = (file1:any[], file2:any[], file3:any[], file4:any[]) :any[] => {
    // console.log(file1, file2, file3, file4)
    const arranged:any[] = []
    file1[0][0] = 'original well ID'
    arranged.push(['new well ID', 'original Plate ID', ...file1[0]])
    let rowNum:number = 65 // 
    for (let i = 0; i < 8; ++i) {
      let colNum:number = 1
      // line of odd number
      for (let j = 1; j <= 12; ++j) {
        arranged.push([String.fromCharCode(rowNum)+colNum,'plate 1',...file1[12*i + j]])
        colNum++
        arranged.push([String.fromCharCode(rowNum)+colNum,'plate 2',...file2[12*i + j]])
        colNum++
      }
      // line of even number
      rowNum++
      colNum = 1
      for (let j = 1; j <= 12; ++j) {
        arranged.push([String.fromCharCode(rowNum)+colNum,'plate 3',...file3[12*i + j]])
        colNum++
        arranged.push([String.fromCharCode(rowNum)+colNum,'plate 4',...file4[12*i + j]])
        colNum++
      }
      rowNum++
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
