import React, { Component } from 'react';
import InteractiveChart from '../../components/InteractiveChart';
import { cleanConfirmedData, organizeData } from '../../utils/data';

/*function InteractiveCharts({ dataSet, orgs, userPrediction, confirmed }) {
    return dataSet.map((data, index) => {
      return (
        <InteractiveChart forecast={data} org={orgs[index]} userPrediction={userPrediction} confirmed={confirmed} />
       );
    })
  }*/

class InteractiveChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: null,
            orgs: null,
            confirmed: null,
            userPrediction: null,
            aggregate: null,
            loginStatus: null
        };
    }

    componentDidMount() {
        fetch('/us-inc-deaths-forecasts').then(res => res.json()).then(data => {
            const [results, orgs] = organizeData(data);
            this.setState({ forecast: results, orgs });
        });
        fetch('/user-prediction?category=us_daily_deaths').then(res => res.json()).then(data => {
            this.setState({ userPrediction: data });
        });
        fetch('/us-inc-deaths-confirmed-wk-avg').then(res => res.json()).then(data => {
            this.setState({ confirmed: data });
        });
        fetch('/us-agg-inc-deaths').then(res => res.json()).then(data => {
            this.setState({ aggregate: data });
            console.log(data);
        });
        fetch('/login-status/').then(res => res.json()).then(data => {
            this.setState({ loginStatus: data });
        });
    }
    render() {
        const { forecast, orgs, userPrediction, confirmed, aggregate, loginStatus } = this.state;
        if (!forecast || !orgs || !userPrediction || !confirmed || !aggregate || !loginStatus) return 'Loading...';

        return (
            <div className="chartContainer">
                <InteractiveChart
                    forecast={forecast}
                    orgs={orgs}
                    userPrediction={userPrediction}
                    confirmed={confirmed}
                    aggregate={aggregate}
                    loginStatus={loginStatus}
                    //userStatus={userStatus}
                />
            </div>
        );
    }
}

export default InteractiveChartContainer;