import { ITableCell } from "./i-table-cell";

export interface ITableRow{
    
    getRow<T>(row: T): T;

    getCells():ITableCell[];

}