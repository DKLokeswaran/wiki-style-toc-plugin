import { TOCProps } from 'interfaces';
import List from './List'


export default function TOC({headings,filePath}:TOCProps) {
    if(headings===null || headings===undefined || headings.length===0){
        return null
    }
    return (
        <div id="content">
            <h3 style={{marginTop: 0}}><center>Table of contents</center></h3>
            <List headings={headings} filePath={filePath}/>
        </div>
    );
}