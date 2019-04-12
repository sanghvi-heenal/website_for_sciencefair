
import React from 'react';


const Datatable = (project) =>
{
console.log("project" , project);
console.log("project" , Object.values(project));
const h = Object.values(project).map(obj => {
    console.log("obj value" , obj.project_id);
    return ( 
        <table  cellpadding="2" width="80%" border="3" cellspacing="3">
            <tr>
                                <td><font size ="3">{obj.s_name1}</font></td>
                                <td><font size ="3">{obj.s_name2}</font></td>
            
            
            </tr>
        </table>
    )
})
return (<h1>{h}</h1>)

}
  
export default Datatable;