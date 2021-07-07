const Table = ({ columns, data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.name} className={column.className}>
              {column.displayName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={column.name}>{item[column.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
