import { useTable } from 'react-table'

const columns = [
    {
      Header: 'My Orders',
      columns: [
        {
          Header: 'type',
          accessor: 'type',
        },
        {
          Header: 'title',
          accessor: 'title',
        },
        {
          Header: 'phone',
          accessor: 'phone',
        },
        {
            Header: 'username',
            accessor: 'username',
        },
        {
            Header: 'email',
            accessor: 'email',
        },
        {
            Header: 'quantity',
            accessor: 'quantity',
        },
        {
            Header: 'status',
            accessor: 'status',
        },
      ],
    },
  ]

const Orders = () => {
    const { data } = this.props;

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
    return (
        <div className="table">
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