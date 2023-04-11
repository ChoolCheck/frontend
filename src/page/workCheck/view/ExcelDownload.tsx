import React, { useState, useRef } from "react";
import { getTotalWorkTime } from "../../../components/common/TotalWorkTime";
import { CSVLink } from "react-csv";
import * as type from "../type";

const ExcelDownload = ({ data, onClickGetFile }: type.ExcelDownloadProps) => {
  const [excelData, setExcelData] = useState<
    {
      date: string;
      name: string;
      time: string;
      workType: string;
      totalWorkTime: string;
    }[]
  >([]);

  const csvLink = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  const header = [
    { label: "날짜", key: "date" },
    { label: "직원명", key: "name" },
    { label: "근무 시간", key: "time" },
    { label: "근무 형태", key: "workType" },
    { label: "총 근무 시간", key: "totalWorkTime" },
  ];

  const getWorkcheckData = async () => {
    if (onClickGetFile()) {
      data.map((item) => {
        excelData.push({
          date: item.date,
          name: item.name,
          time: item.startTime + "-" + item.endTime,
          workType: item.hours ? item.hours : "없음",
          totalWorkTime: getTotalWorkTime(
            Number(item.startTime),
            Number(item.endTime)
          ).toString(),
        });
      });
      csvLink?.current?.link.click();
    }
  };

  return (
    <div>
      <button className="getFileButton" onClick={getWorkcheckData}>
        출근부 엑셀 파일 다운로드
      </button>
      <CSVLink
        data={excelData}
        headers={header}
        filename="출근부.csv"
        className="hidden"
        ref={csvLink}
        target="_blank"
      />
    </div>

    // <CSVLink ref={csvLink} data={data} headers={headers}>
    //   <button>출근부 엑셀 파일 다운로드</button>
    // </CSVLink>
  );
};

export default ExcelDownload;
