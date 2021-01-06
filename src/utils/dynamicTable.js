import React, { Component } from "react";

const TableBody = (props) => {
    const { headers, rows } = props;
  
    function buildRow(row, headers) {
      return (
        <tr key={row.id}>
          {headers.map((value, index) => {
            return <td key={index}>{row[value]}</td>;
          })}
        </tr>
      );
    }
  
    return (
      <tbody>
        {rows &&
          rows.map((value) => {
            return buildRow(value, headers);
          })}
      </tbody>
    );
  };
  const TableHeader = (props) => {
    const { headers } = props;
    return (
      <thead className="thead-light" key="header-1">
        <tr key="header-0">
          {headers &&
            headers.map((value, index) => {
              return (
                <th key={index} className="sorting_asc">
                  <div>{value}</div>
                </th>
              );
            })}
        </tr>
      </thead>
    );
  };
  const Table = (props) => {
    const { headers, rows } = props;
    return (
      <div>
        <table className="table table-head-fixed table-hover text-nowrap">
          <TableHeader headers={headers}></TableHeader>
          <TableBody headers={headers} rows={rows}></TableBody>
        </table>
      </div>
    );
  };

  export default Table