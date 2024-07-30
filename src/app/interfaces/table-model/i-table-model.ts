import { IHeader } from "../i-header";
import { ITableRow } from "./i-table-row";

export interface TableModel{
    
    header: IHeader;
    
    rows: ITableRow;

    setData<T>( data: T): TableModel;
}