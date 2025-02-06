"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { mockData } from "@/src/entities/report/const";
import { useEffect, useState } from "react";
import { Report } from "@/src/entities/report/model";

export const ContentArea: React.FC = () => {
  const pathname = usePathname();
  if (!pathname?.startsWith("/report/list"))
    return (
      <>
        <div>aaa</div>
      </>
    );

  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined
  );
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const paths = pathname?.split("/");
    const [, , , year, month, date] = paths;
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDate(date);
  }, [pathname]);

  if (selectedYear && selectedMonth) {
    const selectedYearReports = mockData.find((yearData) => {
      return yearData.year === Number(selectedYear);
    });

    const selectedMonthReports = selectedYearReports?.months.find(
      (monthData) => {
        return monthData.month === Number(selectedMonth);
      }
    );

    if (selectedDate) {
      const selectedDateReport = selectedMonthReports?.reports.find(
        (report) => {
          return report.date === Number(selectedDate);
        }
      );

      if (selectedDateReport) {
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {selectedDateReport.title}
            </h2>
            <p className="text-gray-600 mb-4">
              日付: {selectedDateReport.date}
            </p>
            <div className="whitespace-pre-wrap">
              {selectedDateReport.content}
            </div>
          </div>
        );
      } else {
        return (
          <>
            <div>日報がありません</div>
          </>
        );
      }
    }

    return (
      selectedMonthReports && (
        <>
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {selectedYear}年 {selectedMonth}月の日報一覧
            </h2>
            <div className="grid gap-4">
              {selectedMonthReports.reports.map((report: Report) => (
                <button
                  key={report.id}
                  className="text-left p-4 border rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold">
                    {report.date}: {report.title}
                  </h3>
                  <p className="text-gray-600 truncate">{report.content}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      )
    );
  }

  return (
    <div className="flex-1 p-6 flex items-center justify-center">
      <p className="text-gray-500">日報または月を選択してください。</p>
    </div>
  );
};
