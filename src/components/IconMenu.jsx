import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function IconMenu({
                                     items,
                                     onItemClick,
                                     buttonId,
                                     menuId,
                                     icon = <ArrowDropDownIcon />,
                                     iconButtonProps,
                                 }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickItem = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
        handleClose();
    };

    return (
        <>
            <IconButton
                id={buttonId}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpen}
                {...iconButtonProps}
            >
                {icon}
            </IconButton>

            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        "aria-labelledby": buttonId,
                    },
                }}
            >
                {items.map((item) => (
                    <MenuItem key={item.label} onClick={() => handleClickItem(item)}>
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
