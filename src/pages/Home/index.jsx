import React, { Component } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";

import Styles from "./index.module.less";

import { getHome } from "@/servers/home.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };

    this.getData = this.getData.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }

  componentDidMount() {
    this.getData();
    // console.log(import.meta.env.VITE_API_URL);
  }

  async getData(params) {
    const result = await getHome();
    console.log(result);
    this.setState({
      lists: [...result.data.data],
    });
  }
  handleRight() {
    this.props.history.push({ pathname: `/search` });
    // console.log(this.props);
  }

  render() {
    return (
      <div className={Styles.home}>
        <Header title="虹の漫画" handleRight={this.handleRight} />
        <div>
          {this.state.lists.map((el, index) => {
            return <Card item={el} key={el.cid} />;
          })}
        </div>
      </div>
    );
  }
}

export default Home;
