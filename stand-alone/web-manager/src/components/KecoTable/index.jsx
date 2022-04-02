// @/src/components/Table/index.jsx
import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const KecoTable = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>date</th>
            <th className={styles.tableHeader}>statNm</th>
            <th className={styles.tableHeader}>statId</th>
            <th className={styles.tableHeader}>chgerId</th>
            <th className={styles.tableHeader}>chgerType</th>
            <th className={styles.tableHeader}>addr</th>
            <th className={styles.tableHeader}>lat</th>
            <th className={styles.tableHeader}>lng</th>
            <th className={styles.tableHeader}>useTime</th>
            <th className={styles.tableHeader}>busiId</th>
            <th className={styles.tableHeader}>busiNm</th>
            <th className={styles.tableHeader}>busiCall</th>
            <th className={styles.tableHeader}>stat</th>
            <th className={styles.tableHeader}>statUpdDt</th>
            <th className={styles.tableHeader}>powerType</th>
            <th className={styles.tableHeader}>zcode</th>
            <th className={styles.tableHeader}>parkingFree</th>
            <th className={styles.tableHeader}>note</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.date}</td>
              <td className={styles.tableCell}>{el.statNm}</td>
              <td className={styles.tableCell}>{el.statId}</td>
              <td className={styles.tableCell}>{el.chgerId}</td>
              <td className={styles.tableCell}>{el.chgerType}</td>
              <td className={styles.tableCell}>{el.addr}</td>
              <td className={styles.tableCell}>{el.lat}</td>
              <td className={styles.tableCell}>{el.lng}</td>
              <td className={styles.tableCell}>{el.useTime}</td>
              <td className={styles.tableCell}>{el.busiId}</td>
              <td className={styles.tableCell}>{el.busiNm}</td>
              <td className={styles.tableCell}>{el.busiCall}</td>
              <td className={styles.tableCell}>{el.stat}</td>
              <td className={styles.tableCell}>{el.statUpdDt}</td>
              <td className={styles.tableCell}>{el.powerType}</td>
              <td className={styles.tableCell}>{el.zcode}</td>
              <td className={styles.tableCell}>{el.parkingFree}</td>
              <td className={styles.tableCell}>{el.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default KecoTable;