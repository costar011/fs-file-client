import React, { memo } from "react";
import axios from "axios";
import Memo from "./components/Memo";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memoData: null,
    };
  }
  componentDidMount = async () => {
    const data1 = "Hi";
    const data2 = "라이언";

    const inputData = {
      data1: data1,
      data2: data2,
    };
    /* Client가 Backend 에게 data보내줄려고 axios를 만듬 */
    await axios
      .post(
        "/api/test",
        {
          params: { inputData },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) =>
        this.setState({
          memoData: response.data,
        })
      );
  };

  render() {
    const { memoData } = this.state;
    return (
      <div>
        {memoData === null
          ? "Loding..."
          : memoData.map((memo) => {
              return <Memo key={memo.refKey} />;
            })}
      </div>
    );
  }
}
export default App;
