import { getTheme } from "flowbite-react";

const datePickerPrimaryButtonTheme = "bg-red-700 hover:bg-red-800 text-white";

export const datePickerTheme = {
  popup: {
    footer: {
      button: { today: datePickerPrimaryButtonTheme },
    },
  },
  views: Object.fromEntries(
    ["days", "months", "years", "decades"].map((view) => [
      view,
      {
        items: {
          item: { selected: datePickerPrimaryButtonTheme },
        },
      },
    ])
  ),
};

const { textInput } = getTheme()

const colorPrimary =
  "text-white bg-red-700 enabled:hover:bg-red-800 focus:ring-red-400";

const theme = {
  button: {
    color: { primary: colorPrimary },
  },
  textInput: {
    field: {
      input: {
        colors: {
          gray: textInput.field.input.colors.gray.replaceAll('cyan', 'orange') + ' outline-none',
        },
      },
    },
  },
  toggleSwitch: {
    toggle: {
      base: 'toggle-bg rounded-full border',
      checked: {
        color: { primary: colorPrimary },
      },
    },
  },
};

export default theme;
