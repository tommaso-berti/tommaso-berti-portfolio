export const outlinedActionButtonSx = {
    transition: "background-color 260ms ease, border-color 260ms ease",
    whiteSpace: "nowrap",
    borderWidth: 1,
    borderColor: "divider",
    color: "text.primary",
    backgroundColor: "background.paper",
    cursor: "pointer",
    textTransform: "none",
    "&:hover": {
        borderColor: "text.secondary",
        backgroundColor: "action.hover",
        cursor: "pointer",
    },
};

export const certificationActionButtonSx = {
    ...outlinedActionButtonSx,
    width: "50%",
    minWidth: 0,
    justifyContent: "center",
    alignSelf: "flex-start",
};
