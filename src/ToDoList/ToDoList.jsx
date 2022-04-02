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
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
  updateTaskAction,
} from "../redux/actions/toDoListAction";
import { arrTheme } from "../Themes/ThemeManager";

class ToDoList extends Component {
  state = {
    taskName: ``,
    disabled: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.taskName !== this.props.taskEdit.taskName) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState({ disabled: false }, () => {
                    this.props.handleEditTask(task);
                  });
                }}
                className="ml-1"
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => this.props.handleDoneTask(task.id)}
                className="ml-1"
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => this.props.handleDeleteTask(task.id)}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => this.props.handleDeleteTask(task.id)}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  handleChangeEvent = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
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
            value={this.state.taskName}
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
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => this.props.handleUpdateTask(this.state.taskName)}
              className="ml-1"
            >
              <i className="fa fa-upload mr-2"></i>Update task
            </Button>
          ) : this.state.taskName.trim() !== "" ? (
            <Button
              onClick={() => {
                this.setState({ disabled: true }, () =>
                  this.props.handleUpdateTask(this.state.taskName)
                );
              }}
              className="ml-1"
            >
              <i className="fa fa-upload mr-2"></i>Update task
            </Button>
          ) : (
            <Button
              onClick={() => {
                this.setState({ disabled: false }, () =>
                  this.props.handleUpdateTask(this.state.taskName)
                );
              }}
              className="ml-1"
            >
              <i className="fa fa-upload mr-2"></i>Update task
            </Button>
          )}

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
    taskList: state.toDoListReducer.taskList,
    taskEdit: state.toDoListReducer.taskEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddTask: (newTask) => {
      dispatch(addTaskAction(newTask));
    },
    handleChangeTheme: (themeId) => {
      dispatch(changeThemeAction(themeId));
    },
    handleDoneTask: (taskId) => {
      dispatch(doneTaskAction(taskId));
    },
    handleDeleteTask: (taskId) => {
      dispatch(deleteTaskAction(taskId));
    },
    handleEditTask: (task) => {
      dispatch(editTaskAction(task));
    },
    handleUpdateTask: (taskName) => {
      dispatch(updateTaskAction(taskName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
