import classes from './LayoutList.module.scss'
import {FC, PropsWithChildren} from "react"
import {DataType} from "../../pages/Main/dataType";

interface LayoutListProps {
    data: DataType[]
}


export const LayoutList: FC<PropsWithChildren<LayoutListProps>> = ({data}) => {
    return (
        <div className={classes.Container}>
            <table className={classes.Table}>
                <tr className={classes.TitleRow}>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>LastUpdated</th>
                    <th>CreatedBy</th>
                    <th>Actions</th>
                </tr>
                {data.map(item => (
                    <tr className={classes.DefaultRow}>
                        <td>{item.Name}</td>
                        <td>{item.Cards}</td>
                        <td>{item.LastUpdated}</td>
                        <td>{item.CreatedBy}</td>
                        <td>{item.Actions}</td>
                    </tr>
                ))}
            </table>
        </div>

    )
}


//
// <li className={classes.ListTitle}>
//     <div>Name</div>
//     <div>Cards</div>
//     <div>Last Updated</div>
//     <div>Created by</div>
//     <div>Actions</div>
// </li>
// {data.map(item => (
//     <li className={classes.DefaultListItem}>
//         <div>{item.Name}</div>
//         <div>{item.Cards}</div>
//         <div>{item.LastUpdated}</div>
//         <div>{item.CreatedBy}</div>
//         <div>{item.Actions}</div>
//     </li>
// ))}