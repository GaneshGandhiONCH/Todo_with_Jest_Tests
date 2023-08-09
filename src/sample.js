test("Edit and Update Todo", async () => {
  const { user, titleInput, contentInput } = setup();
  // click edit button
  const editBtn = screen.getByTestId("edit-1");
  await user.click(editBtn);
  // check edit modal opens
  await waitFor(async () => {
    const modal = await screen.findByTestId("custom-modal");
    expect(modal).toBeVisible();
    // check default edit values are populated
    await screen.findByDisplayValue("odio");
    await screen.findByDisplayValue("justo odio");
    titleInput.setSelectionRange(0, titleInput.value.length);
    await user.type(titleInput, "Test");
    contentInput.setSelectionRange(0, contentInput.value.length);
    await user.type(contentInput, "Test content");
  });

  const savebtn = await screen.findByRole("button", { name: "Save" });
  await user.click(savebtn);
  const modal = screen.getByTestId("custom-modal");
  expect(modal).toBeVisible();

  // // edit values and Save ( saves & close popup)

  // // error not to be shown
  // // await waitFor(() => expect(modal).toBeVisible());
  // // check values got updated
  // await waitFor(async () => {
  //   const title = await screen.findByTestId("title-1");
  //   screen.debug(title);
  //   // expect(title).toHaveDisplayValue("Test");
  // });
});
