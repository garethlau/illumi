import React from "react";
import { render } from "@testing-library/react";
import { Illumi } from "../components/Illumi";
import { Selector } from "../components/Selector";
import { Variant } from "../components/Variant";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

function navigateTo(url: string) {
  window.history.pushState({}, "", url);
}

test("defaults to first variant", () => {
  const { getByText } = render(
    <Illumi>
      <Selector name="color">
        <Variant name="blue">
          <p>Blue</p>
        </Variant>
        <Variant name="red">
          <p>Red</p>
        </Variant>
      </Selector>
    </Illumi>
  );
  expect(getByText("Blue")).toBeInTheDocument();
});

test("renders variant from config object", () => {
  const history = createMemoryHistory();

  const encoded = btoa(JSON.stringify({ selections: { color: "red" } }));
  const url = "?illumi=" + encoded;
  navigateTo(url);

  const { getByText } = render(
    <Router history={history}>
      <Illumi>
        <Selector name="color">
          <Variant name="blue">
            <p>Blue</p>
          </Variant>
          <Variant name="red">
            <p>Red</p>
          </Variant>
        </Selector>
      </Illumi>
    </Router>
  );

  expect(getByText("Red")).toBeInTheDocument();
});
test("renders the default variant", () => {
  const { getByText } = render(
    <Illumi>
      <Selector name="color">
        <Variant name="blue">
          <p>Blue</p>
        </Variant>
        <Variant default name="red">
          <p>Red</p>
        </Variant>
      </Selector>
    </Illumi>
  );

  expect(getByText("Red")).toBeInTheDocument();
});
