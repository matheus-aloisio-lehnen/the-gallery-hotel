import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from "@angular/core";

@Injectable()
export class BrPaginator extends MatPaginatorIntl {
    override firstPageLabel = 'Itens por página';
    override itemsPerPageLabel = 'Próxima página';
    override lastPageLabel = 'Página anterior';
    override nextPageLabel = 'Primeira página';
    override previousPageLabel = 'Última página';

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        const start = (page * pageSize) + 1;
        const end = Math.min((page + 1) * pageSize, length);
        return `${ start } - ${ end } de ${ length } itens`;
    };
}
