import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.queryByText(/History Test/i);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });


test('test that App doesn\'t have a duplicate task', () => {
  render(<App/>, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText(/History Test/i);
  const checkDate = screen.getAllByText(new RegExp(dueDate, "i"));
  expect(check.length).toBe(1);
  expect(checkDate.length).toBe(1);
});

test('test if App doesn\'t have a due tate', () => {
  render(<App/>, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(element);
  const check = screen.queryByText(/History Test/i);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();

});

test('test if App doesn\'t have a task name', () => {
  render(<App/>, container);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.queryByText(/History Test/i);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();
});

test('test if late tasks don\'t have a different color', () => {
  render(<App/>, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2020";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const historyCheck = screen.getByTestId(/History Test/i).style.background;
  expect(historyCheck).not.toBe("white");
  const dueDate2 = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test 2"}});
  fireEvent.change(inputDate, { target: { value: dueDate2}});
  fireEvent.click(element);
  const futureCheck = screen.getByTestId(/History Test 2/i).style.background;
  expect(futureCheck).toBe("rgb(255, 255, 255)");

});

test('test that tasks are deleted with checkbox', () => {
  render(<App/>, container);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.queryByText(/History Test/i);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  const checkbox = screen.getByRole('checkbox');
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();
});


