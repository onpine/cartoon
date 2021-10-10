import React, { Component } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";

import { getHome } from "@/servers/home.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };

    this.getData = this.getData.bind(this);
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

  render() {
    return (
      <div>
        <Header title="虹の漫画" />
        <div>
          {this.state.lists.map((el, index) => {
            return <Card item={el} key={index} />;
          })}
        </div>
      </div>
    );
  }
}

export default Home;
