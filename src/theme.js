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

const theme = {
  button: {
    color: {
      primary:
        "text-white bg-red-700 enabled:hover:bg-red-800 focus:ring-red-400",
    },
  },
};

export default theme;
