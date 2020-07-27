import React, { memo } from "react";
import axios from "axios";
import Memo from "./components/Memo";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Input } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memoData: null,

      isDialogOpen: false,

      input_title: "",
      input_desc: "",
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
    const { memoData, isDialogOpen, input_title, input_desc } = this.state;
    return (
      <div>
        <AddIcon onClick={this._isDialogOpenToggle} />
        {memoData === null
          ? "Loding..."
          : memoData.map((memo) => {
              return <Memo key={memo.refKey} {...memo} />;
            })}

        {/* Dialog area */}

        <Dialog
          onClose={this._isDialogOpenToggle}
          aria-labelledby="customized-dialog-title"
          open={isDialogOpen}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this._isDialogOpenToggle}
          >
            REGISTER MEMO
          </DialogTitle>

          <DialogContent>
            <div>
              <div>제목</div>
              <input
                type="text"
                name="input_title"
                value={input_title}
                onChange={this._valueChangeHanler}
              ></input>
            </div>

            <div>
              <div>내용</div>
              <input
                type="text"
                name="input_desc"
                value={input_desc}
                onChange={this._valueChangeHanler}
              ></input>
            </div>
          </DialogContent>

          <DialogActions>
            <Button autoFocus onClick={this._memoUploadHandler} color="primary">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  _memoUploadHandler = async () => {
    const { input_title, input_desc } = this.state;

    // 전 처리 에서는 데이터를 만듬 key와 input값이 같으면 하나로만 써도 됨
    const inputData = {
      input_title,
      input_desc,
    };

    // 로직
    await axios
      .post("/api/memoUploadHandler", { params: { inputData } })
      .then((response) => {
        if (response.data === 1) {
          this._isDialogOpenToggle();
          this.componentDidMount();
        } else {
          alert("Fail");
        }
      });

    // 후 처리 에서는 성공인지 실패인지 확인할 수 있음
  };

  _valueChangeHanler = (event) => {
    let nextState = {};

    nextState[event.target.name] = event.target.value;

    this.setState(nextState);
  };

  _isDialogOpenToggle = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
    });
  };
}
export default App;
