import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "../Containers/Container";
import { ToDoListDarkTheme } from "../../src/Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../Themes/ToDoListPrimaryTheme";
import { Dropdown } from "../Components/Dropdown";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../Components/Heading";
import { TextField } from "../Components/TextField";
import { Button } from "../Components/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "../Components/Table";
import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
} from "../redux/actions/toDoListAction";
import { arrTheme } from "../Themes/ThemeManager";

class ToDoList extends Component {
  state = {
    taskName: ``,
  };
  renderTaskToDo = () => {
    return this.props.tastList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
                <i className="fa fa-edit"></i>
              </Button>
              <Button className="ml-1">
                <i className="fa fa-check"></i>
              </Button>
              <Button className="ml-1">
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.tastList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  handleChangeEvent = (e) => {
    let { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log("value: ", this.state);
      }
    );
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option value={theme.id} key={index}>
          {theme.name}
        </option>
      );
    });
  };
  handleOnChangeTheme = (e) => {
    let { value } = e.target;
    this.props.handleChangeTheme(value);
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="container w-50">
          <Dropdown
            onChange={(e) => {
              this.handleOnChangeTheme(e);
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading2 className="mt-3">To Do List</Heading2>
          <TextField
            onChange={(e) => {
              this.handleChangeEvent(e);
            }}
            name="taskName"
            label="Task name"
          />
          <Button
            onClick={() => {
              let { taskName } = this.state;
              let newTask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };
              this.props.handleAddTask(newTask);
            }}
            className="ml-1"
          >
            <i className="fa fa-plus mr-2"></i>Add task
          </Button>
          <Button className="ml-1">
            <i class="fa fa-upload mr-2"></i>Update task
          </Button>
          <hr />
          <Heading3 className="mt-3">Task To Do</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <hr />
          <Heading3 className="mt-3">Task Completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.toDoListReducer.themeToDoList,
    tastList: state.toDoListReducer.tastList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddTask: (value) => {
      dispatch(addTaskAction(value));
    },
    handleChangeTheme: (value) => {
      dispatch(changeThemeAction(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
