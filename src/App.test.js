import {
  render,
  screen,
  configure,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
  waitForElement,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

// components
import App from "./App";
import store from "./store";

configure({ testIdAttribute: "id" });

afterEach(() => cleanup());

let user;
let contentInput;
let titleInput;
let listItems;
let addButton;

// initial testcase setup
function setup() {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  user = userEvent.setup();

  contentInput = screen.getByPlaceholderText("Enter Todo eg:car wash...");
  titleInput = screen.getByPlaceholderText(/enter title here.../i);
  listItems = screen.getAllByRole("listitem");
  addButton = screen.getByRole("button", { name: "Add" });
}
beforeEach(() => setup());

function initialCheck(listItems, titleInput, contentInput) {
  expect(listItems).toHaveLength(3);
  expect(titleInput).toHaveValue("");
  expect(contentInput).toHaveValue("");
}
function getErrorMessages() {
  const titleErrorMessage = screen.queryByTestId("titleBlock");
  const contentErrorMessage = screen.queryByTestId("contentBlock");
  return { titleErrorMessage, contentErrorMessage };
}

// testcase begins
test("should do initial render check", () => {
  initialCheck(listItems, titleInput, contentInput);
  // default title check
  const title = screen.getByText(/Todo app/i);
  expect(title).toBeInTheDocument();
});

test("should validate negative scenario 1-No values", async () => {
  await user.click(addButton);
  initialCheck(listItems, titleInput, contentInput);

  // check error message is shown right
  const { titleErrorMessage, contentErrorMessage } = getErrorMessages();
  expect(titleErrorMessage).toBeVisible();
  expect(titleErrorMessage).toHaveTextContent("Title is Required");
  expect(contentErrorMessage).toBeVisible();
  expect(contentErrorMessage).toHaveTextContent("Content is Required");
});

test("should edit and Update Todo", async () => {
  // click edit button
  const editBtn = screen.getByTestId("edit-1");
  await user.click(editBtn);

  // open modal and validate field contents
  await waitFor(async () => {
    const modal = await screen.findByTestId("custom-modal");
    expect(modal).toBeVisible();
    const titleInput = screen.getByTestId("edit-title");
    const contentInput = screen.getByTestId("edit-content");
    // check default edit values are populated
    await screen.findByDisplayValue("odio");
    await screen.findByDisplayValue("justo odio");
    titleInput.setSelectionRange(0, titleInput.value.length);
    await user.type(titleInput, "Test");
    contentInput.setSelectionRange(0, contentInput.value.length);
    await user.type(contentInput, "Test content");
  });

  // update button click
  const savebtn = await screen.findByRole("button", { name: "Save" });
  await user.click(savebtn);

  // check updated list items
  expect(listItems).toHaveLength(3);
  const title = screen.getByTestId("title-1");
  const content = screen.getByTestId("content-1");
  expect(title).toHaveTextContent("Test");
  expect(content).toHaveTextContent("Test content");
});

test("should delete based on id", async () => {
  const deleteBtn = screen.getByTestId("del-1");
  await user.click(deleteBtn);
  await waitFor(async () => {
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
  });
});

test("should valid values & add todo", async () => {
  await user.type(titleInput, "My Title");
  await user.type(contentInput, "My First Content");
  await user.click(addButton);
  // error not to be shown
  const { titleErrorMessage, contentErrorMessage } = getErrorMessages();
  expect(titleErrorMessage).not.toBe(true);
  expect(contentErrorMessage).not.toBe(true);
  // list count increases by 1
  const listelements = await screen.findAllByRole("listitem");
  expect(listelements).toHaveLength(3);
});

test("should validate Negative scenario 2-Invalid values", async () => {
  const testInputs = {
    it: "atleast 3 characters",
    "This text contains maximum of 33 characters for testing purpose":
      "atmost 32 characters",
  };

  Object.keys(testInputs).map(async (input) => {
    await user.type(titleInput, input);
    await user.type(contentInput, input);
    await user.click(addButton);

    // check error message is shown right
    const { titleErrorMessage, contentErrorMessage } = getErrorMessages();
    expect(titleErrorMessage).toBeVisible();
    expect(titleErrorMessage).toHaveTextContent(
      `Title should contain ${testInputs[input]}`
    );
    expect(contentErrorMessage).toBeVisible();
    expect(contentErrorMessage).toHaveTextContent(
      `Content should contain ${testInputs[input]}`
    );
    expect(listItems).toHaveLength(3);
  });
});
