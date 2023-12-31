import { reportConstants } from "@/constants/report.constant";
import { TypedDispatch } from "@/redux/store";
import reportService from "@/services/report.service";
import { ReduxAction, Report, ReportModel } from "@/type";

const reportActions = {
  getReports,
  getReport,
};
export default reportActions;

function getReports() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    reportService
      .getReports()
      .then((res) => dispatch(success(res.data)))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: reportConstants.GET_REPORTS,
      };
    }

    function success(reports: ReportModel[]): ReduxAction {
      return {
        type: reportConstants.GET_REPORTS_SUCCESS,
        payload: { reports },
      };
    }

    function error(err: string): ReduxAction {
      return {
        type: reportConstants.GET_REPORTS_ERROR,
        payload: { err },
      };
    }
  };
}

function getReport(id: number) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    reportService
      .getReport(id)
      .then((data) => dispatch(success(data.data)))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: reportConstants.GET_REPORT,
      };
    }

    function success(report: ReportModel): ReduxAction {
      return {
        type: reportConstants.GET_REPORT_SUCCESS,
        payload: { report },
      };
    }

    function error(err: string): ReduxAction {
      return {
        type: reportConstants.GET_REPORT_ERROR,
        payload: { err },
      };
    }
  };
}
