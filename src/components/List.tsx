import { HeadingCache } from "obsidian";
import { LinkProps, HeadingMap } from 'src/interfaces';



export default function List({headings,filePath}:LinkProps){
    if(headings.length===0){
        return null;
    }
    const level = headings[0].level;
    let headingMap:HeadingMap[] = [];
    let nextLevelHeadingArray:HeadingCache[]= [];
    for(let headingCache of headings.slice().reverse()){
        if(headingCache.level === level){
            headingMap.push({
                headingCache,
                element: <List headings={nextLevelHeadingArray.slice().reverse()} filePath={filePath} />})
            nextLevelHeadingArray=[]
        } else {
            nextLevelHeadingArray.push(headingCache);
        }
    }
    return (
        <ol>
        {    
            headingMap.slice().reverse().map((headingMapping)=> (
                <li key={headingMapping.headingCache.heading}>
                    <a data-href={`${filePath}#${headingMapping.headingCache.heading}`} href={`${filePath}#${headingMapping.headingCache.heading}`} className="internal-link" >
                    {headingMapping.headingCache.heading}
                    </a>
                    {headingMapping.element}
                </li>                
            ))
         }
        </ol>
    );

    
}