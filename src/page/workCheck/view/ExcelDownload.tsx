import { useState, useRef, useEffect } from "react";
import { getTotalWorkTime } from "../../../components/common/TotalWorkTime";
import { CSVLink } from "react-csv";
import * as type from "../type";

const ExcelDownload = ({ data, onClickGetFile }: type.ExcelDownloadProps) => {
  const [excelData, setExcelData] = useState<
    Array<{
      date: string;
      name: string;
      time: string;
      workType: string;
      totalWorkTime: string;
    }>
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

  useEffect(() => {
    if (excelData.length > 0) {
      csvLink?.current?.link.click();
      setExcelData([]);
    }
  }, [excelData]);

  const getWorkcheckData = async () => {
    const newData: Array<{
      date: string;
      name: string;
      time: string;
      workType: string;
      totalWorkTime: string;
    }> = [];

    if (onClickGetFile() && data) {
      data.map((item) => {
        newData.push({
          date: item.date,
          name: item.name,
          time:
            item.startTime.substring(0, 5) + "-" + item.endTime.substring(0, 5),
          workType: item.hours ? item.hours : "없음",
          totalWorkTime: getTotalWorkTime(
            item.startTime,
            item.endTime
          ).toString(),
        });
        console.log(getTotalWorkTime(item.startTime, item.endTime).toString());
        console.log(getTotalWorkTime(item.startTime, item.endTime));
      });
      setExcelData(newData);
      csvLink?.current?.link.click();
    }
  };

  return (
    <div>
      <button className="getFileButton" onClick={getWorkcheckData}>
        출근부 엑셀 파일 다운로드
      </button>
      {excelData.length > 0 && (
        <CSVLink
          data={excelData}
          headers={header}
          filename="출근부.csv"
          className="hidden"
          ref={csvLink}
          target="_blank"
        />
      )}
    </div>
  );
};

export default ExcelDownload;
