import { useState, useRef, useEffect } from "react";
import { CSVLink } from "react-csv";
import { GetExcelDataApi } from "../../../api/workcheck";
import * as type from "../type";

const ExcelDownload = ({
  startTime,
  endTime,
  onClickGetFile,
}: type.ExcelDownloadProps) => {
  const [excelData, setExcelData] = useState<Array<type.excelDataProps>>([]);

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

  useEffect(() => {
    if (excelData.length > 0) {
      csvLink?.current?.link.click();
      setExcelData([]);
    }
  }, [excelData]);

  const getWorkcheckData = async () => {
    if (onClickGetFile()) {
      GetExcelDataApi({ startTime, endTime, setExcelData });
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
  );
};

export default ExcelDownload;
