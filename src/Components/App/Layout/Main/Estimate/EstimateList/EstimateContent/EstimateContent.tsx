import "./EstimateContent.css";

import React, { Component, MouseEvent } from "react";

import { IHandlePage } from "../../../../../App";
import { IEstimateInfo } from "../../EstimateForm/EstimateFormMain/EstimateFormMain";
import { RequestHandler, IConfig } from "../../../../../../../util/RequestHandler";

interface IEstimateContentProps {
  handlePage: IHandlePage;
}

interface IEstimateList {
  car_estimate_no: number;
  capital: string;
  car_brand: string;
  car_series: string;
  car_model: string;
  car_detail: string;
  car_grade: string;
  car_option: string;
  at_date: string;
}

interface IEstimateContentState {
  estimateList: IEstimateList[];
  error: string;
}

interface IEstimateListData {
  estimateList: IEstimateList[];
  status: number;
  statusText: string;
}

interface IEstimateInfoData {
  estimateInfo: IEstimateInfo;
  status: number;
  statusText: string;
}

export default class EstimateContent extends Component<IEstimateContentProps, IEstimateContentState> {
  constructor(props: IEstimateContentProps) {
    super(props);

    this.state = {
      estimateList: [
        {
          car_estimate_no: 0,
          capital: "",
          car_brand: "",
          car_series: "",
          car_model: "",
          car_detail: "",
          car_grade: "",
          car_option: "",
          at_date: ""
        }
      ],
      error: ""
    };
  }

  async componentDidMount() {
    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/estimate/list`;
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const result = await requestHandler.get(uri, config);

    this.setState({ estimateList: result.data.estimateList, error: result.error });
  }

  handleViewBtnClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const estimateNo = e.currentTarget.dataset.estimateNo || "0";

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/estimate/${estimateNo}`;
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const result = await requestHandler.get(uri, config);

    sessionStorage.setItem("estimateInfo", JSON.stringify(result.data.estimateInfo));
    this.setState({ error: result.error });
    this.props.handlePage("/estimate/form");
  };

  render() {
    const { estimateList, error } = this.state;

    return (
      <div className="estimate_list_container">
        <div className="estimate_list">
          <h4>지난견적보기</h4>

          <hr />

          <div className="estimate_list_row">
            <div>날짜</div>
            <div>캐피탈</div>
            <div>차량정보</div>
            <div>보기</div>
          </div>

          {error ? <div className="list-error-msg">{error}</div> : <div />}

          {error
            ? null
            : estimateList.map((estimate) => {
                const carInfo = `${estimate.car_brand} ${estimate.car_series} ${estimate.car_model} ${
                  estimate.car_detail
                } ${estimate.car_grade} ${estimate.car_option}`;

                const atDate = new Date(estimate.at_date);
                const parseDate = `${atDate.getFullYear()} / ${atDate.getMonth() + 1} / ${atDate.getDate()}`;

                return (
                  <div className="estimate_list_row" key={estimate.at_date}>
                    <div>{parseDate}</div>
                    <div>{estimate.capital}</div>
                    <div>{carInfo}</div>
                    <div>
                      <button onClick={this.handleViewBtnClick} data-estimate-no={estimate.car_estimate_no}>
                        견적서 보기
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}
