import { useMemo } from 'react'
import { useTable } from 'react-table'



const Orders = ({data, title}) => {
    const columns = useMemo(() => [
        {
          Header: title,
          columns: data.length?Object.keys(data[0]).map((v) => {
            return {
              Header: v,
              accessor: v
            }
          }):
          [],
        },
      ], []);

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })

      console.log("data", data);
      console.log("columns", columns);
    return (
        <div className="orders__table">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;