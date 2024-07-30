import { IHeader } from "../interfaces/i-header";

export class ProductTableInfo{
    public static getHeaders(): IHeader[] {
        return [
            { key: 'id', label: 'Id', hidden: true },
            { key: 'logo', label: 'Logo', isImage: true },
            { key: 'name', label: 'Nombre del prducto' },
            { key: 'description', label: 'Descripcion', info: 'Representa a descripción del producto financiero' },
            { key: 'date_release', label: 'Fecha de liberación', info: 'Representa la fecha de liberación del producto financiero' },
            { key: 'date_revision', label: 'Fecha de reestructuración',  info: 'Representa la fecha de revisión del producto financiero' } ];
    }
}