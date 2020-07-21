import React from "react";

// 객체인데 React Component기능을 가진 객체로 변환
class Memo extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.content}</div>
        <div>{this.props.regDate}</div>
      </div>
    );
  }
}
export default Memo;
