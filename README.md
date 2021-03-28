# Illumi

## Overview

Illumi helps you manipulate your UI.

## Installation

```
npm install illumi
```

or

```
yarn add illumi
```

## Quickstart

```jsx
import React from "react";
import { Illumi, Selector, Variant } from "illumi";

const App: React.FC<{}> = () => {
  return (
    <div>
      <Selector name="hero">
        <Variant name="mountains">
          <img src="./mountains.jpg" />
        </Variant>
        <Variant name="coffee">
          <img src="./coffee.jpg" />
        </Variant>
        <Variant name="fields">
          <img src="./fields.jpg" />
        </Variant>
      </Selector>
    </div>
  );
};

ReactDOM.render(
  <Illumi>
    <App />
  </Illumi>,
  document.getElementById("root")
);
```

## API

### `Illumi`

Use the `<Illumi />` component to connect and provide configurations to your application:

```jsx
import { Illumi } from 'illumi'

function App() {
    return <Illumi>...<Illumi/>
}
```

Options

- `config: Config`
  - Optional
  - `url: string`
    - Used by configuration panel to generate the URL.
  - `removeOnMount: boolean`
    - Defaults to `true`
    - Set to false to keep the stringified configuration object in the URL.

### `Selector`

Consumes configuration object and determines which `Variant` should be displayed and which should be hidden. If no selections are matched, the default variant is selected. If no default is provided, the first element provided to the component is used as the fallback.

Options

- `name: string`
  - **Required**
  - Identifier for the selector. Should be unique.

### `Variant`

- `name: string`
  - **Required**
  - Identifer for the variant.
  - The name of the variant is used by the `Selector` component to determine which variant should be selected and displayed (or hidden).
- `default: true`
  - Optional
  - Set to `true` to mark the variant as the default variant to display in the situation where no other configurations are provided.

## Roadmap

- [ ] Configuration generator panel
- [ ] Different persistance methods
- [ ] Time based persistance
